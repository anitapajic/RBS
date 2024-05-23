from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return f"HOME"


@app.route('/', methods=['POST'])
def safety_system():
    try:
        data = request.json.get('data')
        print("Received data:", data)
        return jsonify({"response": data})
    except Exception as e:
        return jsonify({"response": "error - " + str(e)})


@app.route('/b', methods=['PUT'])
def deactivate_alarm():
    try:
        print("bbbbbbbb")
    except Exception as e:
        return jsonify({"response": "error - " + str(e)})


if __name__ == '__main__':
    app.run(debug=True, port=8085)
