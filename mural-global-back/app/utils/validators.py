"""
Utilidades de validación para la aplicación.
"""

def validate_topic_content(content):
    """
    Valida el contenido de un tema.
    
    Args:
        content: Contenido a validar
        
    Returns:
        tuple: (is_valid, error_message)
    """
    if not content:
        return False, "El contenido no puede estar vacío"
    
    if not isinstance(content, str):
        return False, "El contenido debe ser texto"
    
    content = content.strip()
    
    if len(content) < 3:
        return False, "El contenido debe tener al menos 3 caracteres"
    
    if len(content) > 280:
        return False, "El contenido no puede exceder los 280 caracteres"
    
    return True, None

def validate_response_content(content):
    """
    Valida el contenido de una respuesta.
    
    Args:
        content: Contenido a validar
        
    Returns:
        tuple: (is_valid, error_message)
    """
    if not content:
        return False, "El contenido no puede estar vacío"
    
    if not isinstance(content, str):
        return False, "El contenido debe ser texto"
    
    content = content.strip()
    
    if len(content) < 1:
        return False, "El contenido no puede estar vacío"
    
    if len(content) > 200:
        return False, "La respuesta no puede exceder los 200 caracteres"
    
    return True, None

def sanitize_input(text):
    """
    Sanitiza texto de entrada para prevenir XSS.
    
    Args:
        text: Texto a sanitizar
        
    Returns:
        str: Texto sanitizado
    """
    if not text:
        return text
    
    # Reemplazar caracteres peligrosos
    replacements = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '&': '&amp;'
    }
    
    for char, replacement in replacements.items():
        text = text.replace(char, replacement)
    
    return text