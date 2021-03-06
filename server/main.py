from flask import Flask, session, request, jsonify
from flask.json import JSONEncoder
from flask_restful import Api, Resource, reqparse, abort
from DeclarativeSQL import init_db, db_session
from flask_bcrypt import Bcrypt
from models import User, Patient, ImageModel
from flask_sqlalchemy import SQLAlchemy
import hashlib
from sqlalchemy import insert

app = Flask(__name__)
app.json_encoder = JSONEncoder
api = Api(app)


# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
#
#
#
# db = SQLAlchemy(app)
#
# db.create_all()
#
# image_put_args = reqparse.RequestParser()
# image_put_args.add_argument("name", type=str, help="Name of the image is required", required=True)
# image_put_args.add_argument("dataTime", type=str, help="Date of create the image", required=True)
# image_put_args.add_argument("comment", type=str, help="Comment to the image", required=True)
#
# images = {}
#
# def abort_if_image_id_doesnt_exist(image_id):
#     if image_id not in images:
#         abort(404, massage="Could not find video...")
#
#
# def abort_if_image_exist(image_id):
#     if image_id in images:
#         abort(409, massege="Image already exists")
#
#
# class Image(Resource):
#     def get(self, image_id):
#         result = ImageModel.query.get
#         return images[image_id]
#
#     def put(self, image_id):
#         abort_if_image_exist(image_id)
#         args = image_put_args.parse_args()
#         images[image_id] = args
#         return images[image_id], 201
#
#     def delete(self, image_id):
#         abort_if_image_id_doesnt_exist(image_id)
#         del images[image_id]
#         return "", 204
#
# users = {"user":
#              {"id": 134, "name": "str", "lastname": "str",
#               "phone": "str", "fodselsnummer": 12457825678,
#               "email": "str", "password": "str"}}
#
# class HelloWorld(Resource):
#     def get(self, user):
#         return users[user]
#
# patients = {"patient":
#                 {"id": 124, "name": "str", "lastname": "str",
#                  "phone": "str", "fodselsnummer": 1245125678,
#                  "email": "str"}}
# class Patient(Resource):
#     def get(self, patient):
#         return patients[patient]
#
#
#
#
# api.add_resource(HelloWorld, "/helloworld/<string:user>")
# api.add_resource(Patient, "/patient/<string:patient>")
# api.add_resource(Image, "/image/<string:image_id>")
#

# if __name__ == "__main__":
#     app.run(debug=True)
#
#
# class Api(object):
#     pass


@app.route('/')
def index():
    return "hello Word"


@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(
        email=email).first()  # lager foresporsel til db, filtrerer over email og får den første linie med svar
    print(user.password)
    if user.password == hashlib.md5(str(password).encode('utf-8')).hexdigest():  # algoritm sha256

        return jsonify({
            'name': user.name,
            'lastname': user.lastname,
            'phone': user.phone
        })
    else:
        return 'Invalid email/password'


@app.route('/registration', methods=['POST'])
def registration():
    name = request.form.get('name')
    lastname = request.form.get('lastname')
    phone = request.form.get('phone')
    fodselsnummer = request.form.get('fodselsnummer')
    email = request.form.get('email')
    password = hashlib.md5(str(request.form.get('password')).encode('utf-8')).hexdigest()

    user = User.query.filter_by(email=email).first()

    if (user):
        return 'Email already exists'

    new_user = User(name, email, lastname, phone, fodselsnummer, password)
    db_session.add(new_user)
    db_session.commit()
    return jsonify({
        'name': user.name,
        'lastname': user.lastname,
        'phone': user.phone
    })

@app.route('/users', methods=['GET'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify(num_results=len(users),
                       objects=[user.serialize() for user in users])




@app.route('/user/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def users(id = None):
    if request.method == 'GET':
        user = User.query.filter(User.id == id).first()
        return jsonify({
                    'name': user.name,
                    'lastname': user.lastname,
                    'phone': user.phone,
                    'fodselsnummer': user.fodselsnummer,
                    'email': user.email
                    })
    elif request.method == 'PUT':
        user = User.query.filter(User.id == id).first()
        user.name = 'my_new_name'
        user.phone = 'my_new_phone'
        user.lastname = 'my_new_lastname'
        user.fodselsnummer = 'my_new_fodselsnummer'
        user.email = 'my_new_email@exampel.com'
        session.add(user)
        session.commit()
        return "Du har endret user dataene"

    elif request.method == 'DELETE':
        user = User.query.filter(User.id == id).delete()
        session.delete(user)
        session.commit()
        return "Brukeren er slettet"



@app.route('/patient/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def patients(id = None):
    if request.method == 'GET':
        patient = Patient.query.filter(Patient.id == id).first()
        return jsonify({
                    'name': patient.name,
                    'lastname': patient.lastname,
                    'phone': patient.phone,
                    'fodselsnummer': patient.fodselsnummer,
                    'email': patient.email
                    })
    elif request.method == 'PUT':
        patient = Patient.query.filter(Patient.id == id).first()
        patient.name = 'my_new_name'
        patient.phone = 'my_new_phone'
        patient.lastname = 'my_new_lastname'
        patient.fodselsnummer = 'my_new_fodselsnummer'
        patient.email = 'my_new_email@exampel.com'
        session.add(patient)
        session.commit()
        return "Du har endret pasient dataene"
    elif request.method == 'DELETE':
        patient = Patient.query.filter(Patient.id == id).delete()
        session.delete(patient)
        session.commit()
        return "Pasientet er slettet"


@app.route('/patient', methods=['POST', 'GET'])
def patient():
    name = request.form.get('name')
    lastname = request.form.get('lastname')
    phone = request.form.get('phone')
    fodselsnummer = request.form.get('fodselsnummer')
    email = request.form.get('email')

    patient = Patient.query.filter_by(fodselsnummer=fodselsnummer).first()
    if request.method == 'POST':
        if (patient):
            return 'Patient already exists'
        else:
            new_patient = Patient(name, lastname, email, phone, fodselsnummer)
            db_session.add(new_patient)
            db_session.commit()
            return jsonify({
                    'name': patient.name,
                    'lastname': patient.lastname,
                    'phone': patient.phone,
                    'fodselsnummer': patient.fodselsnummer
                })


    if request.method == 'GET':
        patients = Patient.query.all()
        return jsonify(num_results=len(patients),
                       objects=[patient.serialize() for patient in patients])


if __name__ == '__main__':
    init_db()
    app.secret_key = 'app'
    app.run(port=8080)
