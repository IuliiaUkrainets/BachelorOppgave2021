from models.patient import PatientModel
from models.image import ImageModel
from flask_restful import Resource
from until.parser import parseRequest
from flask import request, send_from_directory
from werkzeug.utils import secure_filename
import os
import cv2
import numpy as np
import pydicom as dicom
from ast import literal_eval
import os.path

image_compression = {} # save arras 
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'jpg', 'jpeg', 'dcm'}
def allowed_file(filename): # function sjekker utvidelsen for filer
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

class Image(Resource):
    @staticmethod
    def post(): # metode post lagrer bilde til pasient med id i db
        data = parseRequest().parse_args()
        if PatientModel.find_by_id(data['id']):
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join('./image/', filename))
                image = ImageModel({'id_patient': data['id'], 'image': filename })
                try:
                    image.save_to_db()
                except:
                    return {"error": "An error occurred inserting the item"}, 500

                return image.json(), 201
        else:
            return {'error': "A patient with îd '{}' not found ".format(
                data['id'])}, 404

class ImagePath(Resource): # returnerer bilder i matriser (arrey 2 d)
    @staticmethod
    def get(name):
        if request.method == "GET":
            if name in image_compression:
                arr = image_compression[name]
            else:
                images = './image/'+name+'.dcm'
                from until.wavelet import get_wavelet2, wavelet
                arr = get_wavelet2(images)
                image_compression[name] = arr

            return {"image": arr}, 201

class Images(Resource): # leverer matriser med bilder navn i format jpg
    @staticmethod
    def get(array):
        if request.method == "GET":
            image = literal_eval(array)
            result = {}
            for img in image:
                if os.path.exists('./image/'+img+'.jpg'):
                    result[img] = img+'.jpg'
                else:
                    from until.wavelet import get_image_jpg
                    result[img] = get_image_jpg(img)
            return result, 201

class TextImage(Resource): # function for å få text fra DICOM fil
    @staticmethod
    def get(name):
        if request.method == "GET":
            images = './image/'+name+'.dcm'
            d = dicom.dcmread(images)

            return {"text": str(d)}, 201

class sendImage(Resource): # sender image fra mapen image
    @staticmethod
    def get(path):
        return send_from_directory('./image', path)


class Negative(Resource): #function for oversetelse bilde til negative
    @staticmethod
    def get(name):
        from until.wavelet import get_original_image
        images = './image/' + name + '.dcm'
        return {'image': get_original_image(images)}, 201


class Roi(Resource): # function for roi
    @staticmethod
    def get(arr):
        t = arr.split(',') #foresporsel fra client parset
        print(t)
        from until.wavelet import get_image, get_random_string
        images = './image/' + t[0] + '.dcm'
        image = get_image(images)
        name = get_random_string() + '.jpg'
        path = './image/'+ name
        a = int(t[4]) - int(t[2])
        b = int(t[3]) - int(t[1])
        if(a > b):
            cv2.imwrite(path, np.uint8(image[int(t[2]): int(t[4]), int(t[1]): int(t[3])+a-b]))
        else:
            cv2.imwrite(path, np.uint8(image[int(t[2]): int(t[4])+b-a, int(t[1]): int(t[3])]))

        return {'image': name}, 201
