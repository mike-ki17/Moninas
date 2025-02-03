# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import create_access_token
# import mysql.connector
# import bcrypt
# import os
# from dotenv import load_dotenv

# # Cargar variables de entorno
# load_dotenv()

# # Crear el Blueprint
# auth_bp = Blueprint("auth", __name__)

# # Conectar a MySQL


# # Endpoint de login para obtener el JWT
# @auth_bp.route("/login", methods=["POST"])
# def login():
#     datos = request.json
#     email = datos.get("email")
#     password = datos.get("password")

#     # Buscar el usuario en la base de datos
#     cursor.execute("SELECT id, password FROM usuarios WHERE email = %s", (email,))
#     usuario = cursor.fetchone()

#     # Validar si el usuario existe y la contraseña es correcta
#     if usuario and bcrypt.checkpw(password.encode("utf-8"), usuario["password"].encode("utf-8")):
#         token = create_access_token(identity=usuario["id"])
#         return jsonify({"token": token}), 200

#     return jsonify({"mensaje": "Credenciales incorrectas"}), 401
