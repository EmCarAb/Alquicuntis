from datetime import date
from flask import jsonify, request
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required
from app.models.alquicuntis import Pedidos, Productos, Usuarios, db

@jwt_required()
def get_pedidos():
    entidad = get_jwt()
    es_admin = entidad.get('is_administrator')

    if (es_admin):

        pedidos = Pedidos.query.all()

        lista_pedidos = []
        for pedido in pedidos:
            pedido_data = {
                'id': pedido.id,
                'usuario': pedido.usuarios.nombre,
                'correo': pedido.usuarios.correo,
                'producto': pedido.producto.nombre,
                'modelo': pedido.producto.modelo,
                'precio': pedido.producto.precio,
                'fecha': pedido.fecha
            }
            lista_pedidos.append(pedido_data)

        return jsonify(lista_pedidos)
    
@jwt_required()
def get_pedidos_usuario():
    identidad_usuario = get_jwt_identity()
    usuario_id = Usuarios.query.filter_by(username = identidad_usuario).first().id
    pedidos = Pedidos.query.filter_by(usuario_id=usuario_id).all()
    lista_pedidos = []
    for pedido in pedidos:
        pedido_data = {
            'id': pedido.id,
            'usuario': pedido.usuarios.nombre,
            'correo': pedido.usuarios.correo,
            'producto': pedido.producto.nombre,
            'modelo': pedido.producto.modelo,
            'precio': pedido.producto.precio,
            'fecha': pedido.fecha
        }
        lista_pedidos.append(pedido_data)
    return jsonify(lista_pedidos)


@jwt_required()
def create_pedido():
    identidad_usuario = get_jwt_identity()
    data = request.json
    usuario_id = Usuarios.query.filter_by(username = identidad_usuario).first().id
    producto_id = data.get('producto_id')
    fecha       = date.today().strftime('%d/%m/%Y')
 
    usuario  = Usuarios.query.get(usuario_id)
    producto = Productos.query.get(producto_id)

    if not usuario or not producto:
        return jsonify({'error': 'Usuario o producto no encontrado'}), 404

    nuevo_pedido = Pedidos(usuario_id=usuario_id, producto_id=producto_id, fecha=fecha)

    if producto.stock > 0:
        producto.stock -= 1
        
    db.session.add(nuevo_pedido)
    db.session.commit()

    return jsonify({'message': 'Pedido creado'}), 201

def delete_pedidos(id):
   pedido = Pedidos.query.get(id)
   if not pedido:
        return jsonify({'message': 'Pedido no encontrado'}), 404

   db.session.delete(pedido)
   db.session.commit()
   return jsonify({'message': 'Pedido eliminado'})