import numpy as np
from .DKTModel import DKTModel as dktmodel
from ..llm.utils import KCList

kclist = KCList()

class DKTUtility:
    def __init__(self):
        self.num_skills = 465
        self.hidden_units = 200
        self.batch_size = 1
        self.time_window = 20

    def preprocessing(self, input_list):
        X = []
        print(type(input_list), type(input_list[0]))
        print(input_list[0][0])
        transformed_list = [(item[0], item[1]) for item in input_list]
        # transformed_list = [item[0] for item in input_list]
        X.append(transformed_list)

        print("X: ", X)
        return X

    def preprocessing2(self, example_sequences):
        maxlen = max([len(s) for s in example_sequences])
        maxlen = self.round_to_multiple(maxlen, self.time_window)

        x = []
        for seq in example_sequences:
            print(28, type(seq))
            print(seq)
            x_seq = []
            for skill, is_correct in seq:
                print(31, type(skill), type(is_correct))
                xt = [0] * (self.num_skills * 2)
                print(33)
                pos = skill * 2 + is_correct  # 정답과 오답 위치를 반대로
                print(35)
                xt[pos] = 1
                x_seq.append(xt)
            while len(x_seq) < self.time_window:
                x_seq.append([0] * (self.num_skills * 2))
            x.append(x_seq)

        if len(x) < self.batch_size:
            for _ in range(self.batch_size - len(x)):
                x_seq = [[0] * (self.num_skills * 2) for _ in range(self.time_window)]
                x.append(x_seq)

        X = np.array(x)
        return X

    def round_to_multiple(x, base):
        return int(base * np.ceil(float(x) / base))

    def get_last_status(predictions):
        last_row = predictions[0][-1]
        result = []

        for idx, value in enumerate(last_row):
            result.append({
                "kcId": idx,
                "predict": round(value * 100, 4)
            })

        return result

    def dkt_model(self, subject, interactions):
        print(94)
        X = self.preprocessing(interactions)
        print(96)
        X = self.preprocessing2(X)
        print(98)
        # model_file = 'C:\projects\myproject\model\dataset.txt.model_weights'
        model = dktmodel.load_model(self.num_skills, self.hidden_units,  self.time_window)
        print(102)
        predictions = model.predict(X, batch_size=self.batch_size)
        last_status = self.get_last_status(predictions)
        start_idx, end_idx = kclist.get_kc_idx(str(subject[0]))
        print(start_idx, end_idx)
        last_status = last_status[start_idx:end_idx]
        print(last_status)
        return last_status







