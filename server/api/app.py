from flask import Flask
from db import db
from models.patient import PatientModel

app = Flask(__name__)
app.config.from_pyfile('config.cfg')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@app.before_first_request
def create_tables():
    print("*********************************")
    db.create_all()


if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
