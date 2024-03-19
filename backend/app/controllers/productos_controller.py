import os
from flask import jsonify, request, send_from_directory
from flask_jwt_extended import get_jwt, jwt_required
from app.models.alquicuntis import Productos, db
from definitions import IMAGES_FOLDER

def get_productos():
    tipo = request.args.get("tipo")

    if tipo:
        productos = Productos.query.filter_by(tipo=tipo).all()
    else:
        productos = Productos.query.all()
        
    lista_productos = []
    for producto in productos:
        lista_productos.append({
            'id':     producto.id,
            'tipo':   producto.tipo,
            'nombre': producto.nombre,
            'modelo': producto.modelo,
            'stock':  producto.stock,
            'precio': producto.precio,
            'imagen': producto.imagen
        })
    return jsonify(lista_productos)

def get_producto_by_id(id):
    producto = Productos.query.get(id)
        
    return jsonify({
            'id':     producto.id,
            'tipo':   producto.tipo,
            'nombre': producto.nombre,
            'modelo': producto.modelo,
            'stock':  producto.stock,
            'precio': producto.precio,
            'imagen': producto.imagen
        })

@jwt_required()
def create_producto():
    entidad = get_jwt()
    es_admin = entidad.get('is_administrator')

    if (es_admin):
        if 'imagen' not in request.files:
            return jsonify({'error': 'Sin parte de imagen'})

        imagen = request.files['imagen']

        if imagen.filename == '':
            return jsonify({'error': 'No has seleccionado un archivo de imagen'})

        filename = os.path.join(IMAGES_FOLDER, imagen.filename)
        imagen.save(filename)

        data   = request.form
        tipo   = data.get('tipo')
        nombre = data.get('nombre')
        modelo = data.get('modelo')
        stock  = data.get('stock')
        precio = data.get('precio')
        imagen = imagen.filename
        producto = Productos(tipo=tipo, nombre=nombre, modelo=modelo, stock=stock, precio=precio, imagen=imagen)
        db.session.add(producto)
        db.session.commit()

        return jsonify({'message': 'Producto creado'}), 201

@jwt_required()
def update_producto(id):
    entidad = get_jwt()
    es_admin = entidad.get('is_administrator')

    if (es_admin):
        producto = Productos.query.get(id)
        if not producto:
            return jsonify({'message': 'Producto no encontrado'}), 404

        data = request.json
        producto.tipo   = data.get('tipo', producto.tipo)
        producto.nombre = data.get('nombre', producto.nombre)
        producto.modelo = data.get('modelo', producto.modelo)
        producto.stock  = data.get('stock', producto.stock)
        producto.precio = data.get('precio', producto.precio)
        db.session.commit()
        return jsonify({'message': 'Producto actualizado'})

@jwt_required()
def delete_productos(id):
    entidad = get_jwt()
    es_admin = entidad.get('is_administrator')

    if (es_admin):
        producto = Productos.query.get(id)
        if not producto:
             return jsonify({'message': 'Producto no encontrado'}), 404

        db.session.delete(producto)
        db.session.commit()
        return jsonify({'message': 'Producto eliminado'})


def uploaded_file(filename):
    return send_from_directory(IMAGES_FOLDER, filename)