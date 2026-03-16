"""
Inicializador de blueprints.
Exporta los blueprints para facilitar su importación.
"""
from app.blueprints.topics import topics_bp
from app.blueprints.responses import responses_bp

__all__ = ['topics_bp', 'responses_bp']
