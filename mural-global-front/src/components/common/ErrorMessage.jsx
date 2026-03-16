import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

/**
 * Mensaje de error estilizado.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.message - Mensaje de error
 * @param {Function} props.onRetry - Función para reintentar
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Icon name="error" className="text-red-500 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-red-700 dark:text-red-300">
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 transition-colors"
            >
              Intentar nuevamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func
};

export default ErrorMessage;