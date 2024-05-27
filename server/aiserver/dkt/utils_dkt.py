import numpy as np
from keras.models import Sequential
from keras.layers import Masking, LSTM, TimeDistributed, Dense
import tensorflow as tf

num_skills = 465  # kc 수 (학습시킬 때)
hidden_units = 200
batch_size = 1  # user 1명
time_window = 20  # 문제 수 최대 20


def preprocessing(input_list):
    X = []
    print(type(input_list), type(input_list[0]))
    print(input_list[0][0])
    transformed_list = [(item[0], item[1]) for item in input_list]
    #transformed_list = [item[0] for item in input_list]
    X.append(transformed_list)

    print("X: ", X)
    return X


def preprocessing2(example_sequences, num_skills, time_window, batch_size):
    maxlen = max([len(s) for s in example_sequences])
    maxlen = round_to_multiple(maxlen, time_window)

    x = []
    for seq in example_sequences:
        print(28, type(seq))
        print(seq)
        x_seq = []
        for skill, is_correct in seq:
            print(31, type(skill), type(is_correct))
            xt = [0] * (num_skills * 2)
            print(33)
            pos = skill * 2 + is_correct  # 정답과 오답 위치를 반대로
            print(35)
            xt[pos] = 1
            x_seq.append(xt)
        while len(x_seq) < time_window:
            x_seq.append([0] * (num_skills * 2))
        x.append(x_seq)

    if len(x) < batch_size:
        for _ in range(batch_size - len(x)):
            x_seq = [[0] * (num_skills * 2) for _ in range(time_window)]
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


# 과목에 따른 kc idx 정하는 함수
def get_kc_idx(subject):
    if subject == "OPERATING_SYSTEM":
        return 0, 93
    elif subject == "COMPUTER_COMMUNICATION":
        return 93, 249
    elif subject == "C_LANGUAGE":
        return 249, 324
    elif subject == "OBJECT_ORIENTED_PROGRAMMING":
        return 324, 435
    else:
        return 0, 0


def loss_function(y_true, y_pred):
    skill = y_true[:, :, 0:num_skills]
    obs = y_true[:, :, num_skills]
    rel_pred = tf.reduce_sum(y_pred * skill, axis=2)
    return tf.keras.losses.binary_crossentropy(obs, rel_pred)


def load_model(model_file, num_skills, hidden_units, batch_size, time_window):
    model = Sequential()
    model.add(Masking(mask_value=-1.0, input_shape=(time_window, num_skills * 2)))
    model.add(LSTM(units=hidden_units, return_sequences=True, stateful=False))
    model.add(TimeDistributed(Dense(units=num_skills, activation='sigmoid')))
    model.compile(loss=loss_function, optimizer='rmsprop')
    model.load_weights(model_file)
    return model


def dkt_model(subject, interactions):
    print(94)
    X = preprocessing(interactions)
    print(96)
    X = preprocessing2(X, num_skills, time_window, batch_size)
    print(98)
    #model_file = 'C:\projects\myproject\model\dataset.txt.model_weights'
    model_file = ".dataset.txt.model_weights"
    model = load_model(model_file, num_skills, hidden_units, batch_size, time_window)
    print(102)
    predictions = model.predict(X, batch_size=batch_size)
    last_status = get_last_status(predictions)
    start_idx, end_idx = get_kc_idx(str(subject[0]))
    print(start_idx, end_idx)
    last_status = last_status[start_idx:end_idx]
    print(last_status)
    return last_status

