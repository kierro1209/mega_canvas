from flask import Flask, request, jsonify
import requests
import time

app = Flask(__name__)

def load_model():
    # Simulate the process of loading a heavy AI model
    time.sleep(1)  # Delay to simulate model load time
    return "dummy-model"

# Load your model once when the service starts
model = load_model()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = data.get("input_data", "")
        # Process the input_data using your AI model (this is just an example)
        processed_data = f"Processed({input_data}) by {model}"
        
        # Optionally, perform an external API call
        api_response = requests.get("https://api.example.com/data")
        external_data = api_response.json()

        return jsonify({
            "prediction": processed_data,
            "external_data": external_data
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
