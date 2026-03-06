from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import os
from agent import MeditationAgent

app = Flask(__name__)
CORS(app)  # Enable CORS for development

meditation_agent = MeditationAgent()

# Example API endpoint
@app.route('/api/hello')
def hello():
    return jsonify({'message': 'Hello from Flask backend!'})

@app.route('/api/generate', methods=['POST'])
def generate_text():
    try:
        print('Received request ', request.json)
        data = request.json
        user_input = data.get('prompt')
        print('Prompt ', user_input)
        
        response, status_code = meditation_agent.generate_meditation(user_input)
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Production setup for React static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join('frontend/dist', path)):
        return send_from_directory('frontend/dist', path)
    else:
        return send_from_directory('frontend/dist', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)