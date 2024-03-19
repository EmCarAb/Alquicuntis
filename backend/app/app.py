from app.routes import include_routers
from flask import Flask
from app.models.alquicuntis import db
import os
from definitions import BBDD, IMAGES_FOLDER
from flask_jwt_extended import JWTManager

def start_app():

    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = BBDD
    app.config['UPLOAD_FOLDER'] = IMAGES_FOLDER
    app.config['JWT_SECRET_KEY'] = 'super-secret'
    jwt = JWTManager(app)

    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    db.init_app(app)

    include_routers(app)
    
    with app.app_context():
        db.create_all()

    return app
