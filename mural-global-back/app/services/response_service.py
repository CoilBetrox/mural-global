"""
Servicio para manejar la lógica de negocio de respuestas.
"""
from app import db
from app.models.response import Response
from app.models.topic import Topic


class ResponseService:
    """Servicio para operaciones con respuestas."""

    @staticmethod
    def create_response(topic_id, content):
        """
        Crea una nueva respuesta para un tema.

        Args:
            topic_id: ID del tema
            content: Contenido de la respuesta

        Returns:
            Response: Respuesta creada o None si el tema no existe
        """
        topic = Topic.query.get(topic_id)
        if not topic:
            return None

        response = Response(content=content.strip(), topic_id=topic_id)
        db.session.add(response)
        db.session.commit()
        return response

    @staticmethod
    def get_responses_by_topic(topic_id):
        """
        Obtiene todas las respuestas de un tema.

        Args:
            topic_id: ID del tema

        Returns:
            list: Lista de respuestas
        """
        return (
            Response.query.filter_by(topic_id=topic_id)
            .order_by(Response.created_at.asc())
            .all()
        )

    @staticmethod
    def get_response_by_id(response_id):
        """
        Obtiene una respuesta por su ID.

        Args:
            response_id: ID de la respuesta

        Returns:
            Response: Respuesta encontrada o None
        """
        return Response.query.get(response_id)

    @staticmethod
    def delete_response(response_id):
        """
        Elimina una respuesta.

        Args:
            response_id: ID de la respuesta a eliminar

        Returns:
            bool: True si se eliminó, False si no existía
        """
        response = Response.query.get(response_id)
        if response:
            db.session.delete(response)
            db.session.commit()
            return True
        return False