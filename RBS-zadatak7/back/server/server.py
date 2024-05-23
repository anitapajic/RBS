from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import io
import tarfile
from werkzeug.utils import secure_filename
import os
import gzip


def create_malicious_tar_gzip():
    # Create a tar file with malicious content
    with tarfile.open('malicious.tar.gz', 'w:gz') as tar:
        tarinfo = tarfile.TarInfo(name='malicious.py')
        tarinfo.size = len(b"import os; os.system('touch /tmp/pwned')")
        tar.addfile(tarinfo, io.BytesIO(b"import os; os.system('touch /tmp/pwned')"))

create_malicious_tar_gzip()


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '/tmp/uploads/'
ALLOWED_EXTENSIONS = {'tar', 'gz'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def extract_tar(file_path, extract_path):
    try:
        with tarfile.open(file_path, 'r:gz') as tar:
            tar.extractall(path=extract_path)
        return None  # Vrati None ako je ekstrakcija uspela
    except Exception as e:
        return str(e)


# Provera dozvoljenog tipa fajla
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'tar', 'gz', 'tar.gz'}


# Ruta za upload fajla
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"response": "No file part"})

    file = request.files['file']

    if file.filename == '':
        return jsonify({"response": "No selected file"})

    if file and allowed_file(file.filename):
        try:
            file_path = os.path.join('uploads/', file.filename)
            file.save(file_path)
            print(file_path)
            error_message = extract_tar(file_path, 'extracted/')
            if error_message is None:
                return jsonify({"response": "File successfully uploaded and extracted"})
            else:
                return jsonify({"response": error_message})
        except Exception as e:
            return jsonify({"response": str(e)})

    return jsonify({"response": "File type not allowed"})


if __name__ == '__main__':
    app.run(debug=True, port=8085)
