from datetime import date
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from app.models.alquicuntis import Usuarios, db

def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    usuario = Usuarios.query.filter_by(username=username).first()

    if usuario and usuario.contrasenha == password:
        access_token = create_access_token(identity=username, additional_claims={"is_administrator": usuario.es_admin})
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Credenciales inválidas'}), 401

def signin():
    usuarios = Usuarios.query.all()
    lista_usuarios = []
    for usuario in usuarios:
         lista_usuarios.append ({
            'id': usuario.id,
            'nombre': usuario.nombre,
            'apellidos': usuario.apellidos,
            'username': usuario.username,
            'correo': usuario.correo,
            'contrasenha': usuario.contrasenha,
        })
        
    return jsonify(lista_usuarios)

def create_user():
    data = request.form
    nombre      = data.get('nombre')
    apellidos   = data.get('apellidos')
    username    = data.get('username')
    correo      = data.get('correo')
    contrasenha = data.get('contrasenha')

    usuario = Usuarios(nombre=nombre, apellidos=apellidos, username=username, correo=correo, contrasenha=contrasenha)
    db.session.add(usuario)
    db.session.commit()

    return jsonify({'message': 'Usuario created successfully'}), 201
