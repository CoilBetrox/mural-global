import React from 'react';
import PropTypes from 'prop-types';

/**
 * Área de texto con contador de caracteres.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.value - Valor del textarea
 * @param {Function} props.onChange - Función al cambiar
 * @param {string} props.placeholder - Texto placeholder
 * @param {number} props.maxLength - Longitud máxima
 * @param {string} props.className - Clases adicionales
 * @param {boolean} props.showCount - Mostrar contador
 */
function Textarea({ 
  value, 
  onChange, 
  placeholder, 
  maxLength, 
  className = '',
  showCount = false,
  ...props 
}) {
  const charCount = value?.length || 0;
  const isOverLimit = maxLength && charCount > maxLength;
  
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`
          w-full bg-transparent border-none focus:ring-0 resize-none
          placeholder:text-slate-400 dark:placeholder:text-slate-600 p-0
          ${className}
        `}
        {...props}
      />
      
      {showCount && maxLength && (
        <div className="absolute bottom-2 right-2">
          <span className={`
            text-xs font-medium
            ${isOverLimit 
              ? 'text-red-500 dark:text-red-400' 
              : 'text-slate-400 dark:text-slate-600'
            }
          `}>
            {charCount} / {maxLength}
          </span>
        </div>
      )}
    </div>
  );
}

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  showCount: PropTypes.bool
};

export default Textarea;