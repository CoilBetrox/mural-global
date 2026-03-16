import { useState, useEffect } from 'react';
import { fetchTopics, createTopic, addResponse } from '../services/api';

/**
 * Hook personalizado para manejar temas.
 * @returns {Object} Estado y funciones para manejar temas
 */
function useTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar temas al montar el componente
  useEffect(() => {
    loadTopics();
  }, []);

  /**
   * Carga los temas desde la API.
   */
  const loadTopics = async () => {
    try {
      setLoading(true);
      const data = await fetchTopics();
      setTopics(data.topics ?? data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crea un nuevo tema.
   * @param {string} content - Contenido del tema
   */
  const handleCreateTopic = async (content) => {
    try {
      const newTopic = await createTopic({ content });
      setTopics([newTopic, ...topics]);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Agrega una respuesta a un tema.
   * @param {number} topicId - ID del tema
   * @param {string} content - Contenido de la respuesta
   */
  const handleAddResponse = async (topicId, content) => {
    try {
      const newResponse = await addResponse(topicId, { content });
      setTopics(topics.map(topic => 
        topic.id === topicId 
          ? { 
              ...topic, 
              responses: [...(topic.responses || []), newResponse],
              responses_count: (topic.responses_count || 0) + 1
            }
          : topic
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    topics,
    loading,
    error,
    createTopic: handleCreateTopic,
    addResponse: handleAddResponse,
    refreshTopics: loadTopics
  };
}

export default useTopics;