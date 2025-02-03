from flask import Flask, jsonify, request, render_template, redirect, url_for, flash
from flask_mysqldb import MySQL
from config import config
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token
import os
import bcrypt
from auth import auth_bp
import datetime



load_dotenv()


app=Flask(__name__, template_folder='./src/templates/', static_folder='./src/static') 



conexion = MySQL(app)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
CORS(app, resources={r"/*": {"origins": os.getenv('CORD_ORIGIN')}})
jwt = JWTManager(app)

@app.route('/')
@jwt_required()
def index ():
    # return redirect(url_for('login'))
    return render_template("auth/login.html")


@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.json['username']
        password = request.json['password']
        
        cursor = conexion.connection.cursor()
        sql = "SELECT id, password FROM users WHERE username = %s"
        cursor.execute(sql, (username,))
        datos_user = cursor.fetchone()  # Devuelve una tupla (id, password)

        if datos_user is None:
            return jsonify({"mensaje": "Usuario no encontrado"}), 401

        if datos_user:
            hashed_password = datos_user[1]

            if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
                # Generar un JWT si las contraseñas coinciden
                access_token = create_access_token(identity=datos_user[0], expires_delta=datetime.timedelta(hours=1))
                return jsonify({"token": access_token}), 200
            else:
                return jsonify({"message": "Contraseña incorrecta"}), 401
        else:
            return jsonify({"messaje": "Usuario no encontrado"}), 401


    except Exception as ex:
        return jsonify({"mensaje": ex}), 500


app.register_blueprint(auth_bp, url_prefix="/auth")


@app.route('/pedidos', methods=['GET'])
def listar_pedidos():
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT * FROM pedidos"
        cursor.execute(sql)
        datos = cursor.fetchall()
        pedidos = [{'nombre':fila[1],    
                    'telefono':fila[2], 
                    'direccion':fila[3], 
                    'descripcionPedido':fila[4], 
                    'correo':fila[5],
                    'pedido':fila[6]
                    } for fila in datos]
        return jsonify({'Pedidos': pedidos, 'mensaje':'Pedidos listados.'})
    except Exception as ex:
        return jsonify({'mensaje': 'Error'})
    

@app.route('/pedidos/<id>', methods=['GET'])
def leer_pedido(id):
    try:
        cursor = conexion.connection.cursor()   
        sql = "SELECT * FROM pedidos where id = %s"
        cursor.execute(sql, (id,))
        datos = cursor.fetchone()
        if datos != None: 
            pedido = {'nombre':datos[1], 'telefono':datos[2], 'direccion':datos[3], 'descripcionPedido':datos[4], 'correo':datos[5], 'pedido':datos[6]}
            return jsonify({'pedido': pedido, 'mensaje': 'Pedido encontrado'})
    except Exception as ex:
        return jsonify({'mensaje': 'Error'})

@app.route('/pedidos', methods=['POST'])
def registrar_pedido():
    try:
        correo = request.json['correo']
        descripcionPedido = request.json['descripcion']
        direccion = request.json['direccion']
        nombre = request.json['nombre']
        telefono = request.json['telefono']
        pedidoJSON = request.json['pedidoJSON']
        cursor = conexion.connection.cursor()
        sql = """
        INSERT INTO pedidos (correo, descripcionPedido, direccion, nombre, telefono, pedido) 
        VALUES (%s, %s, %s, %s, %s, %s)
        """   
        cursor.execute(sql, (correo, descripcionPedido, direccion, nombre, telefono, pedidoJSON))                
        conexion.connection.commit()
        return jsonify({'mensaje': 'Pedido registrado'})
    except Exception as ex:
        return jsonify({'mensaje': 'Error al subir los datos', 'error': str(ex)})


def pagina_no_encontrada(error):
    return "<h1>La página que intentas buscar no existe ... </h1>"

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()