import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para iconos de Material Symbols.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.name - Nombre del icono
 * @param {string} props.className - Clases adicionales
 */
function Icon({ name, className = '' }) {
  return (
    <span className={`material-symbols-outlined text-xl ${className}`}>
      {name}
    </span>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Icon;