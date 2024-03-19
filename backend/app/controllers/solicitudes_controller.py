from flask import jsonify, request
from app.models.alquicuntis import Solicitudes, db

def get_solicitud():
    entrega = request.args.get("entrega")

    if entrega:
        solicitudes = Solicitudes.query.filter_by(entrega=entrega).all()
    else:
        solicitudes = Solicitudes.query.all()
    
    lista_solicitudes = []
    for solicitud in solicitudes:
         lista_solicitudes.append ({
            'id': solicitud.id,
            'nombre_usuario': solicitud.nombre_usuario,
            'apellidos': solicitud.apellidos,
            'correo': solicitud.correo,
            'entrega': solicitud.entrega,
            'razon': solicitud.razon,
            'direccion': solicitud.direccion
        })
        
    return jsonify(lista_solicitudes)

def create_solicitud():
    data = request.form
    nombre_usuario = data.get('nombre_usuario')
    apellidos      = data.get('apellidos')
    correo         = data.get('correo')
    razon          = data.get('razon')
    entrega        = data.get('entrega')
    direccion      = data.get('direccion')
    solicitud = Solicitudes(nombre_usuario=nombre_usuario, apellidos=apellidos, correo=correo, razon=razon, entrega=entrega, direccion=direccion)
    db.session.add(solicitud)
    db.session.commit()

    return jsonify({'message': 'Solicitud creada'}), 201

def delete_solicitudes(id):
   solicitud = Solicitudes.query.get(id)
   if not solicitud:
        return jsonify({'message': 'Solicitud no encontrada'}), 404

   db.session.delete(solicitud)
   db.session.commit()
   return jsonify({'message': 'Solicitud eliminada'})