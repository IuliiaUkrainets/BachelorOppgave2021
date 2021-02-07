from flask import Flask, session, request
from DeclarativeSQL import init_db
from flask_hashing import Hashing
from models import User

app = Flask(__name__)


@app.route('/')
def index():
    return "hello Word"


@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(
        email=email).first()  # lager foresporsel til db, filtrerer over email og får den første linie med svar
    if Hashing.check_value(user.password, password):  # algoritm sha256
        session['user'] = user  # addising bruker til session
        return user
    else:
        return 'Invalid email/password'


@app.route('/registration', methods=['POST'])
def registration():
    name = request.form.get('name')
    lastname = request.form.get('lastname')
    phone = request.form.get('phone')
    fodselsnummer = request.form.get('fodselsnummer')
    email = request.form.get('email')
    password = Hashing.hash_value(request.form.get('password'))

    user = User.query.filter_by(email=email).first()

    if (user):
        return 'Email already exists'

    new_user = User(name, email, lastname, phone, fodselsnummer, password)

    session['user'] = new_user

    return new_user


if __name__ == '__main__':
    init_db()
    app.run(port=8080)
