"""
Rutas para operaciones con temas.
"""
from flask import Blueprint, request, jsonify
from app.services.topic_service import TopicService
from app.utils.validators import validate_topic_content

topics_bp = Blueprint('topics', __name__, url_prefix='/api')

@topics_bp.route('/topics', methods=['GET'])
def get_topics():
    """
    Obtiene todos los temas ordenados por fecha descendente.
    
    Returns:
        JSON: Lista de temas
    """
    try:
        # Obtener parámetros de paginación
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        topics = TopicService.get_all_topics(page=page, per_page=per_page)
        return jsonify({
            'topics': [topic.to_dict() for topic in topics.items],
            'total': topics.total,
            'page': topics.page,
            'pages': topics.pages,
            'per_page': topics.per_page
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@topics_bp.route('/topics/<int:topic_id>', methods=['GET'])
def get_topic(topic_id):
    """
    Obtiene un tema específico por su ID.
    
    Args:
        topic_id: ID del tema
        
    Returns:
        JSON: Datos del tema
    """
    try:
        topic = TopicService.get_topic_by_id(topic_id)
        if topic:
            return jsonify(topic.to_dict()), 200
        return jsonify({'error': 'Tema no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@topics_bp.route('/topics', methods=['POST'])
def create_topic():
    """
    Crea un nuevo tema.
    
    Expects:
        JSON con campo 'content'
        
    Returns:
        JSON: Tema creado
    """
    try:
        data = request.get_json()
        
        # Validar contenido
        is_valid, error_message = validate_topic_content(data.get('content', ''))
        if not is_valid:
            return jsonify({'error': error_message}), 400
        
        topic = TopicService.create_topic(data['content'])
        return jsonify(topic.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@topics_bp.route('/topics/<int:topic_id>/like', methods=['POST'])
def like_topic(topic_id):
    """
    Incrementa el contador de likes de un tema.

    Args:
        topic_id: ID del tema

    Returns:
        JSON: likes actualizado
    """
    try:
        topic = TopicService.like_topic(topic_id)
        if topic:
            return jsonify({'likes': topic.likes}), 200
        return jsonify({'error': 'Tema no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@topics_bp.route('/topics/<int:topic_id>', methods=['DELETE'])
def delete_topic(topic_id):
    """
    Elimina un tema.
    
    Args:
        topic_id: ID del tema a eliminar
        
    Returns:
        JSON: Mensaje de confirmación
    """
    try:
        success = TopicService.delete_topic(topic_id)
        if success:
            return jsonify({'message': 'Tema eliminado correctamente'}), 200
        return jsonify({'error': 'Tema no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500