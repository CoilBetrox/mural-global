"""
Modelo de Topic para la base de datos.
"""
from app import db
from datetime import datetime

class Topic(db.Model):
    """Modelo para temas del mural."""
    
    __tablename__ = 'topics'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    likes = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    responses = db.relationship('Response', backref='topic', lazy='dynamic', cascade='all, delete-orphan')
    
    def __repr__(self):
        """Representación del modelo."""
        return f'<Topic {self.id}: {self.content[:50]}...>'
    
    def to_dict(self):
        """
        Convierte el modelo a diccionario para JSON.
        
        Returns:
            dict: Representación del tema
        """
        return {
            'id': self.id,
            'content': self.content,
            'likes': self.likes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'responses_count': self.responses.count(),
            'responses': [response.to_dict() for response in self.responses.limit(5).all()]
        }