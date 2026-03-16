import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard';
import ResponseList from '../responses/ResponseList';
import ResponseForm from '../responses/ResponseForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { getTopicById } from '../../services/topicsApi';
import { createResponse } from '../../services/responsesApi';
import useResponses from '../../hooks/useResponses';

/**
 * Vista detallada de un tema con sus respuestas.
 * @component
 */
function TopicDetail() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { responses, loading: responsesLoading, addResponse, refreshResponses } = useResponses(id);
  
  // Cargar tema al montar
  useEffect(() => {
    loadTopic();
  }, [id]);
  
  /**
   * Carga los datos del tema.
   */
  const loadTopic = async () => {
    try {
      setLoading(true);
      const data = await getTopicById(id);
      setTopic(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Maneja la creación de una respuesta.
   * @param {number} topicId - ID del tema
   * @param {string} content - Contenido de la respuesta
   */
  const handleAddResponse = async (topicId, content) => {
    const newResponse = await addResponse(topicId, content);
    if (newResponse) {
      // Actualizar contador en el tema
      setTopic(prev => ({
        ...prev,
        responses_count: (prev.responses_count || 0) + 1
      }));
    }
  };
  
  if (loading) {
    return <LoadingSpinner size="lg" />;
  }
  
  if (error || !topic) {
    return (
      <ErrorMessage 
        message={error || 'Tema no encontrado'} 
        onRetry={loadTopic}
      />
    );
  }
  
  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      <TopicCard 
        topic={topic} 
        isExpanded={true}
        onAddResponse={handleAddResponse}
      />
      
      <div className="mt-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
        <ResponseList 
          responses={responses} 
          loading={responsesLoading}
        />
        
        <ResponseForm 
          topicId={parseInt(id)} 
          onSubmit={handleAddResponse}
        />
      </div>
    </div>
  );
}

export default TopicDetail;