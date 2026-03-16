import React from 'react';
import PropTypes from 'prop-types';
import TopicCard from './TopicCard';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

/**
 * Lista de temas del mural.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.topics - Lista de temas
 * @param {boolean} props.loading - Estado de carga
 * @param {string} props.error - Mensaje de error
 * @param {Function} props.onAddResponse - Función para agregar respuesta
 * @param {Function} props.onRetry - Función para reintentar carga
 */
function TopicList({ 
  topics = [], 
  loading = false, 
  error = null, 
  onAddResponse,
  onRetry 
}) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={onRetry}
      />
    );
  }
  
  if (!topics.length) {
    return (
      <EmptyState 
        message="No hay temas aún. ¡Crea el primero!" 
        icon="edit_note"
      />
    );
  }
  
  return (
    <section className="flex flex-col gap-4">
      {topics.map((topic) => (
        <TopicCard 
          key={topic.id} 
          topic={topic} 
          onAddResponse={onAddResponse}
        />
      ))}
    </section>
  );
}

TopicList.propTypes = {
  topics: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onAddResponse: PropTypes.func.isRequired,
  onRetry: PropTypes.func
};

export default TopicList;