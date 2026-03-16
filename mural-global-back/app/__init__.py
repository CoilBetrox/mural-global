"""
Inicializador de la aplicación Flask.
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

# Inicializar extensiones
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    """
    Crea y configura la aplicación Flask.
    """
    app = Flask(__name__)
    
    # Configuración
    app.config.from_object('app.config.Config')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
    
    # Configurar CORS
    cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')
    CORS(app, origins=cors_origins)
    
    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    
    # IMPORTANTE: Registrar blueprints desde la carpeta blueprints
    from app.blueprints import topics_bp, responses_bp
    app.register_blueprint(topics_bp)
    app.register_blueprint(responses_bp)
    
    # Crear tablas si no existen
    with app.app_context():
        db.create_all()
    
    return app