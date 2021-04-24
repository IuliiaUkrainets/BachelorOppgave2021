from flask_restful import reqparse


def parseRequest():
    parser = reqparse.RequestParser()
    parser.add_argument('social_security_number',
                        type=int,
                        required=True,
                        help="The ssn cannot be left blank"
                        )
    parser.add_argument('firstname',
                        type=str,
                        required=True,
                        help="The field firstname cannot be left blank"
                        )

    parser.add_argument('lastname',
                        type=str,
                        required=True,
                        help="The field lastname cannot be left blank"
                        )
    parser.add_argument('phone',
                        type=str,
                        required=True,
                        help="The field phone cannot be left blank"
                        )
    parser.add_argument('email',
                        type=str,
                        required=True,
                        help="The field email cannot be left blank"
                        )
    return parser
