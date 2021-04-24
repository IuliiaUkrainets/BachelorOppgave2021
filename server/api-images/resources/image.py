from models.patient import PatientModel
from models.image import ImageModel
from flask_restful import Resource
from until.parser import parseRequest
from flask import request
from werkzeug.utils import secure_filename
import os

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'jpg', 'jpeg', 'dcm'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

class Image(Resource):
    @staticmethod
    def post():
        data = parseRequest().parse_args()
        if PatientModel.find_by_id(data['id']):
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join('./image/', filename))
                image = ImageModel({'id_patient': data['id'], 'image': filename  })
                try:
                    image.save_to_db()
                except:
                    return {"error": "An error occurred inserting the item"}, 500

                return image.json(), 201
        else:
            return {'error': "A patient with îd '{}' not found ".format(
                data['id'])}, 404