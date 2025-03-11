import pickle
import json
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import xgboost as xgb
import traceback

app = Flask(__name__)
CORS(app)

# Global variables to store loaded models
models = None
le_range = None
mlb = None
metadata = None

def load_models():
    global models, le_range, mlb, metadata
    try:
        with open('autism_therapy_models.pkl', 'rb') as f:
            models = pickle.load(f)

        with open('label_encoder.pkl', 'rb') as f:
            le_range = pickle.load(f)

        with open('multilabel_binarizer.pkl', 'rb') as f:
            mlb = pickle.load(f)

        with open('model_metadata.json', 'r') as f:
            metadata = json.load(f)
        
        print("All models and metadata loaded successfully")
        return True
    except Exception as e:
        print(f"Error loading models: {e}")
        print(traceback.format_exc())
        return False

def prepare_input(data):
    required_columns = [
        'behavioural', 'sensory', 'cognitive', 'social', 
        'emotional', 'speech', 'total_autism_score', 
        'autism_range'
    ]
    
    for col in required_columns:
        if col not in data:
            raise ValueError(f"Missing required column: {col}")
    
    input_df = pd.DataFrame([data])
    
    numeric_columns = [
        'behavioural', 'sensory', 'cognitive', 'social', 
        'emotional', 'speech', 'total_autism_score'
    ]
    
    for col in numeric_columns:
        input_df[col] = pd.to_numeric(input_df[col], errors='coerce').fillna(0).astype(np.float32)
    
    input_df['autism_range_encoded'] = le_range.transform(input_df['autism_range'].astype(str))
    
    domain_lists = input_df.get('high_domains', pd.Series([''])).astype(str).str.split(',').apply(
        lambda x: [item.strip() for item in x] if x[0] != '' else []
    )
    
    domain_matrix = mlb.transform(domain_lists)
    domain_features = pd.DataFrame(
        domain_matrix,
        columns=[f'domain_{col}' for col in mlb.classes_]
    )
    
    input_features = pd.concat([
        input_df[numeric_columns + ['autism_range_encoded']], 
        domain_features
    ], axis=1)
    
    expected_columns = metadata['feature_columns']
    for col in expected_columns:
        if col not in input_features.columns:
            input_features[col] = 0
    
    input_features = input_features[expected_columns]
    
    return input_features.astype(np.float32).values

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_features = prepare_input(data)
        predictions = predict_therapies(input_features)
        return jsonify(predictions)
    except Exception as e:
        print(f"Prediction error: {e}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 400

def predict_therapies(input_data):
    predictions = {}
    for therapy, model in models.items():
        prob = model.predict_proba(input_data)[:, 1]
        predictions[therapy] = prob.tolist()
    return predictions

# Load models at startup
load_models()
