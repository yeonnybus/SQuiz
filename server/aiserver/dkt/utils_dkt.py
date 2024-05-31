import numpy as np
from .DKTModel import DKTModel as dktmodel
from ..llm.utils import KCList
import math

kclist = KCList()

class DKTUtility:
    def __init__(self):
        self.num_skills = 465
        self.hidden_units = 200
        self.batch_size = 1
        self.time_window = 20

    def prepare_dataset(self, dataset):
        seqs_by_student = {}
        for student, problem, is_correct in dataset:
            if student not in seqs_by_student:
                seqs_by_student[student] = []
            seqs_by_student[student].append((problem, is_correct))
        sorted_keys = sorted(seqs_by_student.keys())
        return [seqs_by_student[k] for k in sorted_keys]

    def round_to_multiple(self, x, base):
        return int(base * np.ceil(float(x) / base))

    def get_last_status(self, predictions):
        last_row = predictions[0][-1]
        result = []

        for idx, value in enumerate(last_row):
            result.append({
                "kcId": idx,
                "predict": round(value * 100, 4)
            })

        return result

    def dkt_model(self, mem_id, subject, interactions):
        dataset = [(mem_id, interaction['kcId'], interaction['correct']) for interaction in interactions]
        seqs = self.prepare_dataset(dataset)

        kc_first_mastery = {kc: None for kc in range(self.num_skills)}  # KC별 처음 이해도 추적용
        kc_last_mastery = {kc: None for kc in range(self.num_skills)}  # KC별 마지막 이해도 추적용

        # 각 KC의 마지막 등장 시점을 추적
        last_occurrence = {kc: None for kc in range(self.num_skills)}
        for seq in seqs:
            for t, (skill, _) in enumerate(seq):
                last_occurrence[skill] = t

        dkt_model_instance = dktmodel(self.num_skills)
        model = dkt_model_instance.load_model(self.num_skills, self.hidden_units, self.time_window)

        X = self.prepare_input_data(seqs, self.num_skills)

        preds = []

        def predictor(X, Y):
            batch_activations = model.predict_on_batch(X)
            print("batch_activations", batch_activations)
            skill = Y[:, :, 0:self.num_skills]
            print("skill", skill)
            obs = Y[:, :, self.num_skills]
            y_pred = np.squeeze(np.array(batch_activations))
            print("y_pred", y_pred)
            rel_pred = np.sum(y_pred * skill, axis=2)
            for b in range(0, X.shape[0]):
                for t in range(0, X.shape[1]):
                    if X[b, t, 0] == -1.0:
                        continue
                    preds.append((rel_pred[b][t], obs[b][t]))
                    for k in range(self.num_skills):
                        if skill[b, t, k] == 1:
                            if kc_first_mastery[k] is None:
                                kc_first_mastery[k] = rel_pred[b][t]
                            if t == last_occurrence[k]:
                                kc_last_mastery[k] = rel_pred[b][t]

        self.run_func(seqs, self.num_skills, predictor, self.batch_size, self.time_window)
        
        results = []
        for kc in range(self.num_skills):
            if kc_first_mastery[kc] is not None and kc_last_mastery[kc] is not None:
                change = kc_last_mastery[kc] - kc_first_mastery[kc]
                results.append({
                    "kcId": kc,
                    "predict": round(change * 100, 4)
                })

        return results

    def prepare_input_data(self, seqs, num_skills):
        x = []
        for seq in seqs:
            x_seq = []
            xt_zeros = [0 for i in range(num_skills * 2)]
            xt = xt_zeros[:]
            for skill, is_correct in seq:
                x_seq.append(xt)
                pos = skill * 2 + is_correct
                xt = xt_zeros[:]
                xt[pos] = 1
            x.append(x_seq)
        maxlen = max([len(s) for s in x])
        maxlen = self.round_to_multiple(maxlen, self.time_window)
        X = self.pad_sequences(x, padding='post', maxlen=maxlen, dim=num_skills * 2, value=-1.0)
        return X

    def pad_sequences(self, sequences, maxlen=None, dim=1, dtype='int32',
                      padding='pre', truncating='pre', value=0.):
        lengths = [len(s) for s in sequences]
        nb_samples = len(sequences)
        if maxlen is None:
            maxlen = np.max(lengths)

        x = (np.ones((nb_samples, maxlen, dim)) * value).astype(dtype)
        for idx, s in enumerate(sequences):
            if truncating == 'pre':
                trunc = s[-maxlen:]
            elif truncating == 'post':
                trunc = s[:maxlen]
            else:
                raise ValueError("Truncating type '%s' not understood" % padding)

            if padding == 'post':
                x[idx, :len(trunc)] = trunc
            elif padding == 'pre':
                x[idx, -len(trunc):] = trunc
            else:
                raise ValueError("Padding type '%s' not understood" % padding)
        return x

    def run_func(self, seqs, num_skills, f, batch_size, time_window, batch_done=None):
        assert(min([len(s) for s in seqs]) > 0)

        processed = 0
        for start_from in range(0, len(seqs), batch_size):
            end_before = min(len(seqs), start_from + batch_size)
            x = []
            y = []
            for seq in seqs[start_from:end_before]:
                x_seq = []
                y_seq = []
                xt_zeros = [0 for i in range(0, num_skills * 2)]
                ct_zeros = [0 for i in range(0, num_skills + 1)]
                xt = xt_zeros[:]

                for skill, is_correct in seq:
                    x_seq.append(xt)
                    ct = ct_zeros[:]
                    ct[skill] = 1
                    ct[num_skills] = is_correct
                    y_seq.append(ct)
                    pos = skill * 2 + is_correct
                    xt = xt_zeros[:]
                    xt[pos] = 1

                x.append(x_seq)
                y.append(y_seq)

            maxlen = max([len(s) for s in x])
            maxlen = self.round_to_multiple(maxlen, time_window)
            X = self.pad_sequences(x, padding='post', maxlen=maxlen, dim=num_skills * 2, value=-1.0)
            Y = self.pad_sequences(y, padding='post', maxlen=maxlen, dim=num_skills + 1, value=-1.0)

            for t in range(0, maxlen, time_window):
                f(X[:, t:(t + time_window), :], Y[:, t:(t + time_window), :])

            processed += end_before - start_from
            if batch_done:
                batch_done((processed * 100.0) / len(seqs))
