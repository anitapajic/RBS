from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return f"HOME"


@app.route('/', methods=['PUT'])
def safety_system():
    try:
        print("aaaaaa")
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
