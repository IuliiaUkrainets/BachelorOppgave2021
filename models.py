from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from DeclarativeSQL import Base, init_db




class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    lastname = Column(String(50), unique=True)
    phone = Column(String(50), unique=True)
    fodselsnummer = Column(Integer, unique=True)
    email = Column(String(120), unique=True)
    password = Column(String(255), unique=True)

    def __init__(self, name=None, email=None, lastname=None, phone=None, fodselsnummer=None, password=None):
        self.name = name
        self.email = email
        self.lastname = lastname
        self.phone = phone
        self.fodselsnummer = fodselsnummer
        self.password = password

    def __repr__(self):
        return '<User %r>' % (self.name)



class Patient(Base):
    __tablename__ = 'patient'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    lastname = Column(String(50), unique=True)
    phone = Column(String(50), unique=True)
    fodselsnummer = Column(Integer, unique=True)
    email = Column(String(120), unique=True)

    def __init__(self, name=None, email=None, lastname=None, phone=None, fodselsnummer=None):
        self.name = name
        self.email = email
        self.lastname = lastname
        self.phone = phone
        self.fodselsnummer = fodselsnummer

    def __repr__(self):
        return '<Patient %r>' % (self.name)

class Image(Base):
    __tablename__ = 'image'
    id = Column(Integer, primary_key=True)
    id_user = Column(Integer, unique=True)
    image = Column(String(255), unique=True)
    createAt = Column(DateTime, default= datetime.utcnow)

    def __init__(self, image=None, id_user=None ):
        self.id_user = id_user
        self.image = image


    def __repr__(self):
        return '<Patient %r>' % (self.image)
