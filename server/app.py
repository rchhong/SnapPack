import os
import subprocess
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = "super secret key"


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    print(request.files)
    if request.method == 'POST':
        # check if the post request has the file part
        if 'photo' not in request.files:
            # print("not quite 1");
            flash('No file part')
            return redirect(request.url)
        file = request.files['photo']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            # print("not quite 2");
            flash('No selected file')
            return redirect(request.url)
        if file:
            # print("i made it ??");
            filename = secure_filename(file.filename)
            file.save(os.path.join('uploads/', filename))
            result = subprocess.check_output(['python', 'GoogleTest.py'])
            parsed = str(result.decode("utf-8")).splitlines()[1:]
            print(parsed);
            ret = {"results" : parsed}
            return ret



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
