import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import Textarea from '../common/Textarea';
import Icon from '../common/Icon';

/**
 * Formulario para crear nuevos temas.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onSubmit - Función al enviar el tema
 */
function TopicForm({ onSubmit }) {
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 280;

  /**
   * Maneja el cambio en el textarea.
   * @param {Object} e - Evento de cambio
   */
  const handleContentChange = (e) => {
    const text = e.target.value;
    setContent(text);
    setCharCount(text.length);
  };

  /**
   * Maneja el envío del formulario.
   * @param {Object} e - Evento de submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() && content.length <= MAX_CHARS) {
      await onSubmit(content);
      setContent('');
      setCharCount(0);
    }
  };

  const isDisabled = !content.trim() || content.length > MAX_CHARS;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Textarea
              value={content}
              onChange={handleContentChange}
              placeholder="¿Qué estás pensando?"
              className="min-h-[120px] text-lg"
              maxLength={MAX_CHARS}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-600">
            <Button variant="icon" aria-label="Agregar imagen">
              <Icon name="image" />
            </Button>
            <Button variant="icon" aria-label="Agregar encuesta">
              <Icon name="poll" />
            </Button>
            <Button variant="icon" aria-label="Agregar emoji">
              <Icon name="sentiment_satisfied" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-600">
              {charCount} / {MAX_CHARS}
            </span>
            <Button
              type="submit"
              disabled={isDisabled}
              variant={isDisabled ? 'disabled' : 'primary'}
            >
              Publicar
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

TopicForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TopicForm;