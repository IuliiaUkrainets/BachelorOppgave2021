from db import db
from urllib.parse import urlparse

class PatientModel(db.Model):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    social_security_number = db.Column(db.Integer, unique=True)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    phone = db.Column(db.String(50))
    email = db.Column(db.String(120), unique=True)

    def __init__(self, social_security_number, firstname, lastname, phone, email):
        self.social_security_number = social_security_number
        self.firstname = firstname
        self.lastname = lastname
        self.phone = phone
        self.email = email

    def json(self):
        return {
            'social_security_number': self.social_security_number,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'phone': self.phone,
            'email': self.email
        }

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_ssn(cls, ssn):
        return cls.query.filter_by(social_security_number=ssn).first()

    @classmethod
    def find_by_lastname(cls, lastname):
        return cls.query.filter_by(lastname=lastname).first()

    @classmethod
    def find_by_phone_number(cls, phone):
        return cls.query.filter_by(phone=phone).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
