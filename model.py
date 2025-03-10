import tensorflow as tf
from tensorflowjs.converters import save_keras_model

# Load your model
model = tf.keras.models.load_model('D:\Major-Project\Autism-Detection-1\autism_therapy_xgboost_model.pkl')

# Save the model in TensorFlow.js format
save_keras_model(model, 'D:\Major-Project\Autism-Detection-1')