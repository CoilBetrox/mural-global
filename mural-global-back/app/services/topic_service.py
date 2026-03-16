"""
Servicio para manejar la lógica de negocio de temas.
"""
from app import db
from app.models.topic import Topic

class TopicService:
    """Servicio para operaciones con temas."""
    
    @staticmethod
    def get_all_topics(page=1, per_page=10):
        """
        Obtiene todos los temas paginados.
        
        Args:
            page: Número de página
            per_page: Elementos por página
            
        Returns:
            Pagination: Objeto con temas paginados
        """
        return Topic.query.order_by(Topic.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
    
    @staticmethod
    def get_topic_by_id(topic_id):
        """
        Obtiene un tema por su ID.
        
        Args:
            topic_id: ID del tema
            
        Returns:
            Topic: Tema encontrado o None
        """
        return Topic.query.get(topic_id)
    
    @staticmethod
    def create_topic(content):
        """
        Crea un nuevo tema.
        
        Args:
            content: Contenido del tema
            
        Returns:
            Topic: Tema creado
        """
        topic = Topic(content=content.strip())
        db.session.add(topic)
        db.session.commit()
        return topic
    
    @staticmethod
    def like_topic(topic_id):
        """
        Incrementa el contador de likes de un tema.

        Args:
            topic_id: ID del tema

        Returns:
            Topic: Tema actualizado o None si no existe
        """
        topic = Topic.query.get(topic_id)
        if topic:
            topic.likes = (topic.likes or 0) + 1
            db.session.commit()
            return topic
        return None

    @staticmethod
    def delete_topic(topic_id):
        """
        Elimina un tema.
        
        Args:
            topic_id: ID del tema a eliminar
            
        Returns:
            bool: True si se eliminó, False si no existía
        """
        topic = Topic.query.get(topic_id)
        if topic:
            db.session.delete(topic)
            db.session.commit()
            return True
        return False