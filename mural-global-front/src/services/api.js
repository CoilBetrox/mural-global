/**
 * Servicio para comunicarse con el backend Flask.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Obtiene todos los temas.
 * @returns {Promise<Array>} Lista de temas
 */
export async function fetchTopics() {
  const response = await fetch(`${API_BASE_URL}/topics`);
  if (!response.ok) {
    throw new Error('Error al cargar los temas');
  }
  return response.json();
}

/**
 * Crea un nuevo tema.
 * @param {Object} data - Datos del tema
 * @returns {Promise<Object>} Tema creado
 */
export async function createTopic(data) {
  const response = await fetch(`${API_BASE_URL}/topics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Error al crear el tema');
  }
  return response.json();
}

/**
 * Incrementa el contador de likes de un tema.
 * @param {number} topicId - ID del tema
 * @returns {Promise<Object>} Likes actualizado
 */
export async function likeTopic(topicId) {
  const response = await fetch(`${API_BASE_URL}/topics/${topicId}/like`, {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error('Error al dar like');
  }
  return response.json();
}

/**
 * Agrega una respuesta a un tema.
 * @param {number} topicId - ID del tema
 * @param {Object} data - Datos de la respuesta
 * @returns {Promise<Object>} Respuesta creada
 */
export async function addResponse(topicId, data) {
  const response = await fetch(`${API_BASE_URL}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data, topic_id: topicId })
  });
  
  if (!response.ok) {
    throw new Error('Error al agregar la respuesta');
  }
  return response.json();
}