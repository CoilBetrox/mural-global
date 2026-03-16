"""
Configuraciones de la aplicación.
"""
import os

class Config:
    """Configuración base."""
    # SQLAlchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 10,
        'pool_recycle': 3600,
        'pool_pre_ping': True,
    }
    
    # JSON
    JSON_SORT_KEYS = False
    JSONIFY_PRETTYPRINT_REGULAR = True

class DevelopmentConfig(Config):
    """Configuración de desarrollo."""
    DEBUG = True

class ProductionConfig(Config):
    """Configuración de producción."""
    DEBUG = False
    
    # Configuración más estricta para producción
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 20,
        'pool_recycle': 300,
        'pool_pre_ping': True,
    }