/**
 * API para operaciones con respuestas.
 */
import api from './api';

const BASE_URL = '/responses';

/**
 * Crea una nueva respuesta.
 * @param {Object} data - Datos de la respuesta { topic_id, content }
 * @returns {Promise<Object>} Respuesta creada
 */
export async function createResponse(data) {
  try {
    const response = await api.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating response:', error);
    throw new Error(error.response?.data?.error || 'Error al crear la respuesta');
  }
}

/**
 * Obtiene respuestas de un tema.
 * @param {number} topicId - ID del tema
 * @returns {Promise<Array>} Lista de respuestas
 */
export async function getResponsesByTopic(topicId) {
  try {
    const response = await api.get(`/topics/${topicId}/responses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar las respuestas');
  }
}

/**
 * Elimina una respuesta.
 * @param {number} responseId - ID de la respuesta
 * @returns {Promise<void>}
 */
export async function deleteResponse(responseId) {
  try {
    await api.delete(`${BASE_URL}/${responseId}`);
  } catch (error) {
    console.error('Error deleting response:', error);
    throw new Error(error.response?.data?.error || 'Error al eliminar la respuesta');
  }
}