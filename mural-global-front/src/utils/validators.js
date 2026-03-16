/**
 * Validadores para la aplicación.
 */

// Constantes
export const MAX_TOPIC_CHARS = 280;
export const MAX_RESPONSE_CHARS = 200;
export const MIN_TOPIC_CHARS = 3;

/**
 * Valida el contenido de un tema.
 * @param {string} content - Contenido a validar
 * @returns {Object} Resultado de la validación
 */
export function validateTopic(content) {
  if (!content || typeof content !== 'string') {
    return {
      isValid: false,
      error: 'El contenido es requerido'
    };
  }
  
  const trimmed = content.trim();
  
  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'El contenido no puede estar vacío'
    };
  }
  
  if (trimmed.length < MIN_TOPIC_CHARS) {
    return {
      isValid: false,
      error: `El contenido debe tener al menos ${MIN_TOPIC_CHARS} caracteres`
    };
  }
  
  if (trimmed.length > MAX_TOPIC_CHARS) {
    return {
      isValid: false,
      error: `El contenido no puede exceder los ${MAX_TOPIC_CHARS} caracteres`
    };
  }
  
  // Prevenir contenido malicioso básico
  const hasScriptTag = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(trimmed);
  if (hasScriptTag) {
    return {
      isValid: false,
      error: 'El contenido contiene código no permitido'
    };
  }
  
  return {
    isValid: true,
    sanitized: trimmed
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  };
}

/**
 * Valida el contenido de una respuesta.
 * @param {string} content - Contenido a validar
 * @returns {Object} Resultado de la validación
 */
export function validateResponse(content) {
  if (!content || typeof content !== 'string') {
    return {
      isValid: false,
      error: 'El contenido es requerido'
    };
  }
  
  const trimmed = content.trim();
  
  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'El contenido no puede estar vacío'
    };
  }
  
  if (trimmed.length > MAX_RESPONSE_CHARS) {
    return {
      isValid: false,
      error: `La respuesta no puede exceder los ${MAX_RESPONSE_CHARS} caracteres`
    };
  }
  
  // Prevenir contenido malicioso básico
  const hasScriptTag = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(trimmed);
  if (hasScriptTag) {
    return {
      isValid: false,
      error: 'El contenido contiene código no permitido'
    };
  }
  
  return {
    isValid: true,
    sanitized: trimmed
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  };
}

/**
 * Valida un ID.
 * @param {*} id - ID a validar
 * @returns {boolean} True si es válido
 */
export function validateId(id) {
  if (id === undefined || id === null) return false;
  if (typeof id === 'number') return !isNaN(id) && id > 0;
  if (typeof id === 'string') {
    const parsed = parseInt(id, 10);
    return !isNaN(parsed) && parsed > 0;
  }
  return false;
}

/**
 * Sanitiza texto básico.
 * @param {string} text - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export function sanitizeText(text) {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br>');
}