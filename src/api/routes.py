"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import json


api = Blueprint('api', __name__)

# OBTENER USUARIOS


@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [user.serialize() for user in users]
    return jsonify(user_list), 200

############# AGREGAR USUARIOS ##########################


@api.route('/user', methods=['POST'])
def create_user():
    email = request.json.get('email')
    password = request.json.get('password')

    if not (email and password):
        return jsonify({"message": "Usuario no creado", "created": False}), 400

    # Verificar si el correo electrónico ya existe en la base de datos
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "El correo electrónico ya está en uso", "created": False}), 409

    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Usuario creado", "created": True}), 200


############################# LOGIN #################################

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if email and password is None:
        return jsonify({"msg": "Email y password requeridos"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"message": "El usuario no existe"}), 400

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200
