import React from 'react';
import PropTypes from 'prop-types';

/**
 * Indicador de carga.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.size - Tamaño: 'sm', 'md', 'lg'
 * @param {string} props.color - Color del spinner
 */
function LoadingSpinner({ size = 'md', color = 'primary' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const colors = {
    primary: 'border-primary',
    white: 'border-white',
    gray: 'border-slate-400'
  };
  
  return (
    <div className="flex justify-center items-center p-4">
      <div className={`
        ${sizes[size]} 
        border-2 
        ${colors[color]} 
        border-t-transparent 
        rounded-full 
        animate-spin
      `} />
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'white', 'gray'])
};

export default LoadingSpinner;