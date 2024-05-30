from keras.models import Sequential
from keras.layers import Masking, LSTM, TimeDistributed, Dense
import tensorflow as tf


class DKTModel:

    def __init__(self, num_skills):
        self.model_file = ".dataset.txt.model_weights"


    def loss_function(self, y_true, y_pred):
        skill = y_true[:, :, 0:self.num_skills]
        obs = y_true[:, :, self.num_skills]
        rel_pred = tf.reduce_sum(y_pred * skill, axis=2)
        return tf.keras.losses.binary_crossentropy(obs, rel_pred)


    def load_model(self, num_skills, hidden_units, time_window):
        self.num_skills = num_skills
        model = Sequential()
        model.add(Masking(mask_value=-1.0, input_shape=(time_window, num_skills * 2)))
        model.add(LSTM(units=hidden_units, return_sequences=True, stateful=False))
        model.add(TimeDistributed(Dense(units=num_skills, activation='sigmoid')))
        model.compile(loss=self.loss_function, optimizer='rmsprop')
        model.load_weights(self.model_file)
        return model
