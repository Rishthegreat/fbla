import os
from datetime import timedelta

from PIL import Image
from flask import Flask, request, send_from_directory
from flask_cors import CORS
import models as md
from flask_graphql import GraphQLView
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'yooo this app is so cool'
app.config["UPLOAD_FOLDER"] = "PostImages"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)

@app.route('/images/<image_id>', methods=['GET'])
def image(image_id):
    try:
        filename = f'{image_id}.jpg'
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    except Exception as e:
        print(e)
        return {'message': 'Error retrieving image', 'error': str(e)}, 500

@app.route('/upload', methods=['POST'])
def upload():
    try:
        uploaded_image = request.files['image']
        old_path = app.config['UPLOAD_FOLDER'] + '/' + uploaded_image.filename
        uploaded_image.save(old_path)
        new_path = app.config['UPLOAD_FOLDER'] + '/' + uploaded_image.filename.split('.')[0] + '.jpg'
        with Image.open(old_path) as img:
            img = img.convert('RGB')
            img.save(new_path, 'JPEG', quality=85)
        os.remove(old_path)
        return {'message': 'Image uploaded successfully'}, 200
    except Exception as e:
        return {'message': 'Error uploading image', 'error': str(e)}, 500

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql", schema=md.schema, graphql=True)
)


if __name__ == "__main__":
    app.run(debug=True, port=5000, host='localhost')
