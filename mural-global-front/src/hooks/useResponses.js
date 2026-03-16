import { useState, useEffect, useCallback } from 'react';
import { getResponsesByTopic, createResponse as createResponseApi } from '../services/responsesApi';

/**
 * Hook para manejar respuestas de un tema.
 * @param {number} topicId - ID del tema
 * @returns {Object} Estado y funciones para respuestas
 */
function useResponses(topicId) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar respuestas cuando cambia el topicId
  useEffect(() => {
    if (topicId) {
      loadResponses();
    }
  }, [topicId]);
  
  /**
   * Carga las respuestas del tema.
   */
  const loadResponses = useCallback(async () => {
    if (!topicId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getResponsesByTopic(topicId);
      setResponses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [topicId]);
  
  /**
   * Agrega una nueva respuesta.
   * @param {number} topicIdParam - ID del tema
   * @param {string} content - Contenido de la respuesta
   * @returns {Promise<Object|null>} Respuesta creada o null
   */
  const addResponse = async (topicIdParam, content) => {
    try {
      const newResponse = await createResponseApi({
        topic_id: topicIdParam,
        content
      });
      
      setResponses(prev => [...prev, newResponse]);
      return newResponse;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };
  
  /**
   * Elimina una respuesta (futura implementación).
   * @param {number} responseId - ID de la respuesta
   */
  const deleteResponse = async (responseId) => {
    // Por implementar cuando el backend tenga DELETE /responses/:id
    console.warn('deleteResponse no implementado');
  };
  
  return {
    responses,
    loading,
    error,
    addResponse,
    deleteResponse,
    refreshResponses: loadResponses
  };
}

export default useResponses;