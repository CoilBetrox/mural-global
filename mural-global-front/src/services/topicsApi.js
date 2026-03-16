/**
 * API para operaciones con temas.
 */
import api from './api';

const BASE_URL = '/topics';

/**
 * Obtiene todos los temas con paginación.
 * @param {number} page - Número de página
 * @param {number} perPage - Elementos por página
 * @returns {Promise<Object>} Objeto con temas y metadatos
 */
export async function getTopics(page = 1, perPage = 10) {
  try {
    const response = await api.get(`${BASE_URL}?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar los temas');
  }
}

/**
 * Obtiene un tema por su ID.
 * @param {number} id - ID del tema
 * @returns {Promise<Object>} Datos del tema
 */
export async function getTopicById(id) {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching topic:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar el tema');
  }
}

/**
 * Crea un nuevo tema.
 * @param {Object} data - Datos del tema { content }
 * @returns {Promise<Object>} Tema creado
 */
export async function createTopic(data) {
  try {
    const response = await api.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating topic:', error);
    throw new Error(error.response?.data?.error || 'Error al crear el tema');
  }
}

/**
 * Elimina un tema.
 * @param {number} id - ID del tema
 * @returns {Promise<void>}
 */
export async function deleteTopic(id) {
  try {
    await api.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw new Error(error.response?.data?.error || 'Error al eliminar el tema');
  }
}

/**
 * Obtiene temas populares.
 * @returns {Promise<Array>} Lista de temas populares
 */
export async function getPopularTopics() {
  try {
    const response = await api.get(`${BASE_URL}?sort=popular&limit=20`);
    return response.data.topics || response.data;
  } catch (error) {
    console.error('Error fetching popular topics:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar temas populares');
  }
}