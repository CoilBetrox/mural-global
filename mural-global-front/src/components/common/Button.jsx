import React from 'react';
import PropTypes from 'prop-types';

/**
 * Botón reutilizable con variantes.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.children - Contenido del botón
 * @param {string} props.variant - Variante: 'primary', 'secondary', 'icon', 'disabled'
 * @param {string} props.size - Tamaño: 'sm', 'md', 'lg'
 * @param {boolean} props.disabled - Estado deshabilitado
 * @param {Function} props.onClick - Función al hacer clic
 * @param {string} props.type - Tipo de botón: 'button', 'submit', 'reset'
 * @param {string} props.className - Clases adicionales
 */
function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  ...props 
}) {
  // Estilos base
  const baseStyles = 'font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variantes
  const variants = {
    primary: 'bg-primary text-slate-900 hover:bg-primary/80 focus:ring-primary/50',
    secondary: 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 focus:ring-slate-500',
    icon: 'p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400',
    disabled: 'bg-primary/40 text-slate-500 cursor-not-allowed'
  };
  
  // Tamaños
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const styles = `
    ${baseStyles} 
    ${variants[disabled ? 'disabled' : variant]} 
    ${variant !== 'icon' ? sizes[size] : ''}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'icon', 'disabled']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string
};

export default Button;