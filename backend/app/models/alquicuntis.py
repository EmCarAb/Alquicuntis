from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Productos(db.Model):
    id        = db.Column(db.Integer, primary_key=True)
    tipo      = db.Column(db.Integer, nullable=False)
    nombre    = db.Column(db.String(255), nullable=False)
    modelo    = db.Column(db.String(255), nullable=True)
    stock     = db.Column(db.Integer, nullable=True)
    precio    = db.Column(db.Float, nullable=True)
    imagen    = db.Column(db.String(255), nullable=False)
    productos = db.relationship('Pedidos', cascade="all,delete", backref='producto')

class Solicitudes(db.Model):
    id             = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(255), nullable=False)
    apellidos      = db.Column(db.String(255), nullable=False)
    correo         = db.Column(db.String(255), nullable=False)
    razon          = db.Column(db.String(255), nullable=False)
    entrega        = db.Column(db.Integer, nullable=False)
    direccion      = db.Column(db.String(255), nullable=True)

class Usuarios(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    nombre      = db.Column(db.String(255), nullable=False)
    apellidos   = db.Column(db.String(255), nullable=False)
    username    = db.Column(db.String(255), unique=True, nullable=False)
    correo      = db.Column(db.String(255), unique=True, nullable=False)
    contrasenha = db.Column(db.String(255), nullable=False)
    es_admin    = db.Column(db.Boolean, default=False)
    usuarios    = db.relationship('Pedidos', cascade="all,delete", backref='usuarios')

class Pedidos(db.Model):
    id           = db.Column(db.Integer, primary_key=True)
    usuario_id   = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    producto_id  = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)
    fecha        = db.Column(db.String(15), nullable=False)
