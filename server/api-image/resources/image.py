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

class ImagePath(Resource):
    @staticmethod
    def get(name):
        if request.method == "GET":
            images = './image/'+name+'.dcm'
            from until.wavelet import get_wavelet
            return {"image": get_wavelet(images)}, 201

<<<<<<< HEAD
class Images(Resource):
    @staticmethod
    def get(array):
        if request.method == "GET":
            image = literal_eval(array)
            result = {}
            for img in image:
                images = './image/'+img+'.dcm'
                from until.wavelet import get_image_base64
                result[img] = get_image_base64(images)
            return result, 201

class TextImage(Resource):
    @staticmethod
    def get(name):
        if request.method == "GET":
            images = './image/'+name+'.dcm'
            d = dicom.dcmread(images)
            return {"text": str(d)}, 201

class sendImage(Resource):
    @staticmethod
    def get(path):
        return send_from_directory('./image', path)


class Negative(Resource):
    @staticmethod
    def get(name):
        from until.wavelet import get_original_image
        images = './image/' + name + '.dcm'
        return {'image': get_original_image(images)}, 201
=======
>>>>>>> 0598bac391de28f9f2e88d716082c0b5fb88bf38
