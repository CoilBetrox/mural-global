import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

/**
 * Mensaje para estados vacíos.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.message - Mensaje a mostrar
 * @param {string} props.icon - Icono opcional
 */
function EmptyState({ message, icon = 'inbox' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Icon name={icon} className="text-3xl text-slate-400" />
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        {message}
      </p>
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.string
};

export default EmptyState;