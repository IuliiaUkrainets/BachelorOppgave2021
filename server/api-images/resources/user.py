from flask_restful import Resource, reqparse
from models.user import UserModel
from until.parser import parseRequest


class UserRegister(Resource):
    parser = parseRequest()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be blank"
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be blank"
                        )

    @staticmethod
    def post():
        data = UserRegister.parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {"error": "A user with that username already exists"}, 400

        user = UserModel(**data)
        user.save_to_db()

        return {"message": "User created successfully."}, 201



class Users(Resource):
    @staticmethod
    def get():
        return {'users': [x.json() for x in UserModel.query.all()]}
