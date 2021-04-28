from db import db
from datetime import datetime

class ImageModel(db.Model):
    __tablename__ = 'image'

    id = db.Column(db.Integer, primary_key=True)
    id_patient = db.Column(db.Integer)
    image = db.Column(db.String(255))
    createAt = db.Column(db.DateTime, default= datetime.utcnow)

    def __init__(self, image=None, id_user=None):
        self.id_user = id_user
        self.image = image

    def json(self):
        return {
            'id_patient': self.id_patient,
            'image': self.image,
            'createAt': self.createAt,
        }

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_patient(cls, id_patient):
        return cls.query.filter_by(id_patient=id_patient).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()