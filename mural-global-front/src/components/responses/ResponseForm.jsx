import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import Textarea from '../common/Textarea';
import { validateResponse } from '../../utils/validators';

/**
 * Formulario para crear respuestas.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {number} props.topicId - ID del tema
 * @param {Function} props.onSubmit - Función al enviar respuesta
 */
function ResponseForm({ topicId, onSubmit }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const MAX_CHARS = 200;
  
  /**
   * Maneja el envío del formulario.
   * @param {Object} e - Evento de submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validar contenido
    const validation = validateResponse(content);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onSubmit(topicId, content.trim());
      setContent(''); // Limpiar formulario
    } catch (err) {
      setError('Error al enviar la respuesta. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError('');
            }}
            placeholder="Escribe una respuesta..."
            maxLength={MAX_CHARS}
            showCount
            className="min-h-[60px] text-sm bg-slate-50 dark:bg-slate-800 rounded-lg p-3"
          />
          {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
          )}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Responder'}
        </Button>
      </div>
    </form>
  );
}

ResponseForm.propTypes = {
  topicId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ResponseForm;