from flask import Flask, render_template, request, jsonify
import json
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    with open("data/gazeData.json", "w") as f:
        json.dump(data, f)
    return "✅ Gaze data received!"

@app.route('/analyze', methods=['GET'])
def analyze():
    result = subprocess.run(["python", "analysis.py"], capture_output=True, text=True)
    return jsonify(result=result.stdout)

if __name__ == '__main__':
    app.run(debug=True)