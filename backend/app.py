from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import pandas as pd
from scipy.stats import mode
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from collections import Counter
import pickle

app = Flask(__name__)
CORS(app)

# Define global variables to hold the trained models
svm_model = None
nb_model = None
rf_model = None
encoder = None
data_dict = None

@app.before_request
def load_models():
    global svm_model, nb_model, rf_model, encoder, data_dict
    # Load the trained models and other necessary components using pickle
    with open("svm_model.pkl", "rb") as f:
        svm_model = pickle.load(f)
    with open("nb_model.pkl", "rb") as f:
        nb_model = pickle.load(f)
    with open("rf_model.pkl", "rb") as f:
        rf_model = pickle.load(f)
    with open("encoder.pkl", "rb") as f:
        encoder = pickle.load(f)
    with open("data_dict.pkl", "rb") as f:
        data_dict = pickle.load(f)

@app.route("/api")
def index():
    return jsonify({
        "message": "Backend server is running..",
        "status": 200
    })

@app.route("/api/disease-predict", methods=['POST'])
def predict_disease():
    global svm_model, nb_model, rf_model, encoder, data_dict
    req_body = request.json.get("symptoms")

    # Process the input symptoms
    symptoms = req_body.title().split(",")

    # Create input data for the models
    input_data = [0] * len(data_dict["symptom_index"])
    for symptom in symptoms:
        index = data_dict["symptom_index"].get(symptom)
        if index is not None:
            input_data[index] = 1

    input_data = np.array(input_data).reshape(1, -1)

    # Generate individual predictions
    rf_prediction = data_dict["predictions_classes"][rf_model.predict(input_data)[0]]
    nb_prediction = data_dict["predictions_classes"][nb_model.predict(input_data)[0]]
    svm_prediction = data_dict["predictions_classes"][svm_model.predict(input_data)[0]]

    # Make the final prediction by taking the mode of all predictions
    final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]
    
    predictions = {
        "rf_model_prediction": rf_prediction,
        "naive_bayes_prediction": nb_prediction,
        "svm_model_prediction": svm_prediction,
        "final_prediction": final_prediction
    }
    return jsonify(predictions)

if __name__ == "__main__":
    app.run(port="5000", debug=True)
