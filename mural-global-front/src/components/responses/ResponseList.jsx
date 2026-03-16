import React from 'react';
import PropTypes from 'prop-types';
import ResponseItem from './ResponseItem';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Lista de respuestas de un tema.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.responses - Lista de respuestas
 * @param {boolean} props.loading - Estado de carga
 */
function ResponseList({ responses = [], loading = false }) {
  if (loading) {
    return <LoadingSpinner size="sm" />;
  }
  
  if (!responses.length) {
    return (
      <EmptyState 
        message="No hay respuestas aún. ¡Sé el primero en responder!" 
        icon="chat"
      />
    );
  }
  
  return (
    <div className="mt-4 space-y-1">
      <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
        Respuestas ({responses.length})
      </h4>
      <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700">
        {responses.map((response) => (
          <ResponseItem key={response.id} response={response} />
        ))}
      </div>
    </div>
  );
}

ResponseList.propTypes = {
  responses: PropTypes.array,
  loading: PropTypes.bool
};

export default ResponseList;