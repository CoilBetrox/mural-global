"""
Modelo de Response para la base de datos.
"""
from app import db
from datetime import datetime

class Response(db.Model):
    """Modelo para respuestas a temas."""
    
    __tablename__ = 'responses'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Llave foránea
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id', ondelete='CASCADE'), nullable=False)
    
    def __repr__(self):
        """Representación del modelo."""
        return f'<Response {self.id}: {self.content[:50]}...>'
    
    def to_dict(self):
        """
        Convierte el modelo a diccionario para JSON.
        
        Returns:
            dict: Representación de la respuesta
        """
        return {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'topic_id': self.topic_id
        }