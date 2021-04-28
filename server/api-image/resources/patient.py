from flask_restful import Resource
from models.patient import PatientModel
from until.parser import parseRequest
from flask_jwt import jwt_required


class Patient(Resource):
    @staticmethod
    def delete(id):
        patient = PatientModel.find_by_id(id)
        if patient:
            patient.delete_from_db()
            return {'message': 'Item deleted'}

        if patient is None:
            return {'error': 'Patient with this id does not exist and hence could not be deleted'}

    @staticmethod
    def put(id):

        data = parseRequest().parse_args()

        patient = PatientModel.find_by_id(id)

        if patient:
            patient.firstname = data['firstname']
            patient.lastname = data['lastname']
            patient.phone = data['phone']
            patient.save_to_db()
            return patient.json()

        if patient is None:
            return {'error': "A patient with this id does not exist and hence cannot be updated"}, 400


class CreatePatient(Resource):
    @staticmethod
    def post():
        data = parseRequest().parse_args()

        if PatientModel.find_by_id(data['social_security_number']):
            return {'error': "A patient with security number '{}' already exists".format(
                data['social_security_number'])}, 400

        item = PatientModel(**data)
        try:
            item.save_to_db()
        except:
            return {"error": "An error occurred inserting the item"}, 500

        return item.json(), 201


class PatientById(Resource):
    @jwt_required()
    def get(self, id):
        patient = PatientModel.find_by_id(id)
        if patient:
            return patient.json()
        return {'error': 'Item not found'}, 404


class PatientBySsn(Resource):
    @staticmethod
    def get(ssn):
        patient = PatientModel.find_by_ssn(ssn)
        if patient:
            return patient.json()
        return {'error': 'Item not found'}, 404


class PatientByLastName(Resource):
    @staticmethod
    def get(lastname):
        patient = PatientModel.find_by_lastname(lastname)
        if patient:
            return patient.json()
        return {'error': 'Item not found'}, 404


class PatientByEmail(Resource):
    @staticmethod
    def get(email):
        patient = PatientModel.find_by_email(email)
        if patient:
            return patient.json()
        return {'message': 'Item not found'}, 404


class PatientByPhoneNumber(Resource):
    @staticmethod
    def get(phone):
        patient = PatientModel.find_by_phone_number(phone)
        if patient:
            return patient.json()
        return {'message': 'Item not found'}, 404


class Patients(Resource):
    @staticmethod
    def get():
        return {'patients': [item.json() for item in PatientModel.find_all()]}
