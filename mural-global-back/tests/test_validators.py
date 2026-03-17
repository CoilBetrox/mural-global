from app.utils.validators import (
    sanitize_input,
    validate_response_content,
    validate_topic_content,
)


def test_validate_topic_content_success():
    is_valid, error = validate_topic_content("Tema válido")
    assert is_valid is True
    assert error is None


def test_validate_topic_content_empty_fails():
    is_valid, error = validate_topic_content("")
    assert is_valid is False
    assert error == "El contenido no puede estar vacío"


def test_validate_response_content_too_long_fails():
    is_valid, error = validate_response_content("a" * 201)
    assert is_valid is False
    assert error == "La respuesta no puede exceder los 200 caracteres"


def test_sanitize_input_removes_dangerous_chars():
    raw = '<script>alert("x")</script>'
    sanitized = sanitize_input(raw)
    assert "<" not in sanitized
    assert ">" not in sanitized
    assert '"' not in sanitized
