"""
Rutas para operaciones con respuestas.
"""
from flask import Blueprint, request, jsonify
from app.services.response_service import ResponseService
from app.utils.validators import validate_response_content

responses_bp = Blueprint('responses', __name__, url_prefix='/api')

@responses_bp.route('/responses', methods=['POST'])
def create_response():
    """
    Crea una nueva respuesta para un tema.
    
    Expects:
        JSON con campos 'content' y 'topic_id'
        
    Returns:
        JSON: Respuesta creada
    """
    try:
        data = request.get_json()
        
        # Validar contenido
        is_valid, error_message = validate_response_content(data.get('content', ''))
        if not is_valid:
            return jsonify({'error': error_message}), 400
        
        # Validar topic_id
        topic_id = data.get('topic_id')
        if not topic_id:
            return jsonify({'error': 'Se requiere topic_id'}), 400
        
        response = ResponseService.create_response(topic_id, data['content'])
        if response:
            return jsonify(response.to_dict()), 201
        return jsonify({'error': 'Tema no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@responses_bp.route('/topics/<int:topic_id>/responses', methods=['GET'])
def get_topic_responses(topic_id):
    """
    Obtiene todas las respuestas de un tema.
    
    Args:
        topic_id: ID del tema
        
    Returns:
        JSON: Lista de respuestas
    """
    try:
        responses = ResponseService.get_responses_by_topic(topic_id)
        return jsonify([response.to_dict() for response in responses]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@responses_bp.route('/responses/<int:response_id>', methods=['DELETE'])
def delete_response(response_id):
    """
    Elimina una respuesta.
    
    Args:
        response_id: ID de la respuesta a eliminar
        
    Returns:
        JSON: Mensaje de confirmación
    """
    try:
        success = ResponseService.delete_response(response_id)
        if success:
            return jsonify({'message': 'Respuesta eliminada correctamente'}), 200
        return jsonify({'error': 'Respuesta no encontrada'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500