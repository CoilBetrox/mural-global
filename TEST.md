# Endpoints - Mural Global API

Base URL: `http://localhost:5000/api`

---

## Topics

### GET /topics
Obtiene todos los temas paginados.

**Query params:** `page` (default: 1), `per_page` (default: 10)

**Response 200:**
```json
{
  "page": 1,
  "pages": 1,
  "per_page": 10,
  "total": 1,
  "topics": [
    {
      "id": 1,
      "content": "ejemplo de tema",
      "created_at": "2026-03-16T20:32:52.033592",
      "updated_at": "2026-03-16T20:32:52.033592",
      "responses_count": 0,
      "responses": []
    }
  ]
}
```

---

### GET /topics/:id
Obtiene un tema por su ID.

**Response 200:**
```json
{
  "id": 1,
  "content": "ejemplo de tema",
  "created_at": "2026-03-16T20:32:52.033592",
  "updated_at": "2026-03-16T20:32:52.033592",
  "responses_count": 1,
  "responses": [
    {
      "id": 1,
      "content": "respuesta de prueba",
      "created_at": "2026-03-16T20:35:10.123456",
      "topic_id": 1
    }
  ]
}
```

**Response 404:**
```json
{ "error": "Tema no encontrado" }
```

---

### POST /topics
Crea un nuevo tema.

**Body:**
```json
{ "content": "texto del tema" }
```

**Response 201:**
```json
{
  "id": 2,
  "content": "texto del tema",
  "created_at": "2026-03-16T20:40:00.000000",
  "updated_at": "2026-03-16T20:40:00.000000",
  "responses_count": 0,
  "responses": []
}
```

**Response 400 (contenido vacío):**
```json
{ "error": "El contenido no puede estar vacío" }
```

---

### DELETE /topics/:id
Elimina un tema y sus respuestas en cascada.

**Response 200:**
```json
{ "message": "Tema eliminado correctamente" }
```

**Response 404:**
```json
{ "error": "Tema no encontrado" }
```

---

## Responses

### GET /topics/:id/responses
Obtiene todas las respuestas de un tema.

**Response 200:**
```json
[
  {
    "id": 1,
    "content": "respuesta de prueba",
    "created_at": "2026-03-16T20:35:10.123456",
    "topic_id": 1
  }
]
```

---

### POST /responses
Crea una respuesta para un tema.

**Body:**
```json
{
  "topic_id": 1,
  "content": "texto de la respuesta"
}
```

**Response 201:**
```json
{
  "id": 2,
  "content": "texto de la respuesta",
  "created_at": "2026-03-16T20:45:00.000000",
  "topic_id": 1
}
```

**Response 400 (sin topic_id):**
```json
{ "error": "Se requiere topic_id" }
```

**Response 404 (tema inexistente):**
```json
{ "error": "Tema no encontrado" }
```

---

### DELETE /responses/:id
Elimina una respuesta.

**Response 200:**
```json
{ "message": "Respuesta eliminada correctamente" }
```

**Response 404:**
```json
{ "error": "Respuesta no encontrada" }
```
