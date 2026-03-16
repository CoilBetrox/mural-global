import React from 'react';
import PropTypes from 'prop-types';
import { formatRelativeTime } from '../../utils/formatters';

/**
 * Elemento individual de respuesta.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.response - Datos de la respuesta
 */
function ResponseItem({ response }) {
  return (
    <div className="py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {response.content}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
              Anónimo
            </span>
            <span className="text-xs text-slate-400">
              {formatRelativeTime(response.created_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

ResponseItem.propTypes = {
  response: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired
  }).isRequired
};

export default ResponseItem;