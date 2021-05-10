from flask import Flask
from db import db
from flask_restful import Api
from flask_jwt import JWT
from flask_cors import CORS
from security import authenticate, identity


from resources.patient import \
    Patient, \
    Patients, \
    PatientById, \
    PatientByLastName, \
    PatientByPhoneNumber, \
    PatientByEmail, \
    PatientBySsn, \
    CreatePatient
from resources.user import UserRegister, Users
<<<<<<< HEAD
from resources.image import Image, ImagePath, TextImage, Images, sendImage, Negative
=======
from resources.image import Image, ImagePath
>>>>>>> 0598bac391de28f9f2e88d716082c0b5fb88bf38
app = Flask(__name__)
app.config.from_pyfile('config.cfg')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True

app.secret_key = 'ArcticUniversity'

CORS(app)

jwt = JWT(app, authenticate, identity)
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()


# ENDPOINTS #
api.add_resource(Patients, '/patients')
api.add_resource(Patient, '/patient/<int:id>')
api.add_resource(PatientById, '/patient/id/<int:id>')
api.add_resource(PatientBySsn, '/patient/ssn/<string:ssn>')
api.add_resource(PatientByLastName, '/patient/lastname/<string:lastname>')
api.add_resource(PatientByPhoneNumber, '/patient/phone/<string:phone>')
api.add_resource(PatientByEmail, '/patient/email/<string:email>')
api.add_resource(CreatePatient, '/patient')

api.add_resource(UserRegister, '/register')
api.add_resource(Users, '/users')
api.add_resource(ImagePath, '/image/<string:name>')
<<<<<<< HEAD
api.add_resource(TextImage, '/text/<string:name>')
api.add_resource(Images, '/images/<string:array>')
api.add_resource(sendImage, '/getImage/<string:path>')
api.add_resource(Negative, '/negative/<string:name>')

=======
>>>>>>> 0598bac391de28f9f2e88d716082c0b5fb88bf38
if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
