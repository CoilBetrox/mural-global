import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatRelativeTime } from '../../utils/formatters';
import ResponseList from '../responses/ResponseList';
import ResponseForm from '../responses/ResponseForm';
import Icon from '../common/Icon';
import Button from '../common/Button';
import { likeTopic } from '../../services/api';

/**
 * Tarjeta individual de tema.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.topic - Datos del tema
 * @param {Function} props.onAddResponse - Función para agregar respuesta
 */
function TopicCard({ topic, onAddResponse }) {
  const [showResponses, setShowResponses] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(topic.likes || 0);
  const [liked, setLiked] = useState(false);

  /**
   * Maneja el clic en el tema.
   */
  const handleTopicClick = () => {
    setIsExpanded(!isExpanded);
    if (!showResponses) {
      setShowResponses(true);
    }
  };

  /**
   * Maneja el envío de una respuesta.
   * @param {number} topicId - ID del tema
   * @param {string} content - Contenido de la respuesta
   */
  const handleResponseSubmit = async (topicId, content) => {
    await onAddResponse(topicId, content);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (liked) return;
    try {
      const data = await likeTopic(topic.id);
      setLikes(data.likes);
      setLiked(true);
    } catch (err) {
      console.error('Error al dar like:', err);
    }
  };

  return (
    <article 
      className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors cursor-pointer group"
      onClick={handleTopicClick}
    >
      <div className="p-5 flex flex-col gap-3">
        {/* Header del tema */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Anónimo
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400">
              {formatRelativeTime(topic.created_at)}
            </span>
          </div>
          
          <Button variant="icon" size="sm" aria-label="Más opciones">
            <Icon name="more_horiz" />
          </Button>
        </div>

        {/* Contenido del tema */}
        <h3 className={`text-lg font-semibold leading-relaxed group-hover:text-primary transition-colors ${
          isExpanded ? '' : 'line-clamp-2'
        }`}>
          {topic.content}
        </h3>

        {/* Estadísticas */}
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Icon name="chat_bubble" />
            <span className="text-sm font-medium">{topic.responses_count} respuestas</span>
          </div>
          
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-colors ${
              liked
                ? 'text-red-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-red-400'
            }`}
            aria-label="Dar like"
          >
            <Icon name={liked ? 'favorite' : 'favorite_border'} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          
          <Button 
            variant="icon" 
            size="sm" 
            className="ml-auto"
            aria-label="Compartir"
            onClick={(e) => e.stopPropagation()}
          >
            <Icon name="share" />
          </Button>
        </div>

        {/* Sección de respuestas (expandible) */}
        {showResponses && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <ResponseList responses={topic.responses || []} />
            <ResponseForm 
              topicId={topic.id}
              onSubmit={handleResponseSubmit}
            />
          </div>
        )}
      </div>
    </article>
  );
}

TopicCard.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    responses_count: PropTypes.number,
    likes: PropTypes.number,
    responses: PropTypes.array
  }).isRequired,
  onAddResponse: PropTypes.func.isRequired
};

export default TopicCard;