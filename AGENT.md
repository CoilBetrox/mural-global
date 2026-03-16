# AGENT.md - Guía para Asistentes de IA

## Información del Proyecto
**Nombre:** Mural Global  
**Descripción:** Aplicación web tipo mural anónimo para crear temas y respuestas  
**Objetivo:** Espacio simple para publicar ideas, preguntas o comentarios sin registro

## Stack Tecnológico
- **Backend:** Flask, Flask Blueprints, SQLAlchemy, PostgreSQL
- **Frontend:** React, Vite, TailwindCSS
- **Infraestructura:** Docker, Docker Compose

## Estructura de Archivos
- mural-global/
- ├── mural-global-back/
- │ ├── app/
- │ │ ├── init.py
- │ │ ├── models/
- │ │ │  ├── topic.py
- │ │ │  └── response.py
- │ │ ├── blueprints/
- │ │ │  ├── topic.py
- │ │ │  └── response.py
- │ │ ├── services/
- │ │ │  ├── topic_service.py
- │ │ │  └── response_service.py
- │ │ └── utils/
- │ │    └── validators.py
- │ ├── run.py
- │ ├── requirements.txt
- │ └── .env
- ├── mural-global-front/
- │ ├── src/
- │ │ ├── components/
- │ │ │  ├── layout/
- │ │ │  │  ├── Header.jsx
- │ │ │  │  ├── Footer.jsx
- │ │ │  │  └── Layout.jsx
- │ │ │  ├── topics/
- │ │ │  │  ├── TopicCard.jsx
- │ │ │  │  ├── TopicList.jsx
- │ │ │  │  └── TopicForm.jsx
- │ │ │  ├── responses/
- │ │ │  │  ├── ResponseList.jsx
- │ │ │  │  └── ResponseForm.jsx
- │ │ │  └── common/
- │ │ │     ├── Button.jsx
- │ │ │     ├── Textarea.jsx
- │ │ │     └── Icon.jsx
- │ │ ├── pages/
- │ │ │  ├── HomePage.jsx
- │ │ │  └── TopicPage.jsx
- │ │ ├── hooks/
- │ │ │  ├── useTopics.js
- │ │ │  └── useResponses.js
- │ │ ├── services/
- │ │ │  └── api.js
- │ │ ├── utils/
- │ │ │  └── formatters.js
- │ │ ├── styles/
- │ │ │  └── index.css
- │ │ └── App.jsx
- │ ├── index.html
- │ └── package.json
- ├── docker-compose.yml
- └── README.md

## 🔧 Convenciones de Código

### Generales
- **Idioma código:** Inglés (variables, funciones, clases)
- **Idioma comentarios:** Español (explicaciones claras)
- **Emogis:** No utilizar en código, comentarios o mensajes de commit
- **Formato:** Usar linters (ESLint para React, Flake8 para Flask)
- **Nomenclatura:**
  - `camelCase` para variables y funciones
  - `PascalCase` para componentes React y clases Python
  - `UPPER_CASE` para constantes


### Buenas Prácticas Específicas
- **Backend (Flask)**
  - **Blueprints:** Organizar rutas por recurso (topics, responses)
  - **Modelos:** Usar to_dict() para serialización
  - **Servicios:** Lógica de negocio separada de rutas
  - **Manejo de errores:** Try-catch con respuestas JSON consistentes
  - **Validaciones:** Usar schemas o validadores antes de DB

- **Frontend (React)**
  - **Componentes:** Preferir funcionales con hooks
  - **Estado:** Usar estado local para UI, contexto para estado global
  - **Peticiones:** Servicios separados en services/api.js
  - **Estilos:** Utilizar clases de Tailwind exclusivamente
  - **Props:** Validar siempre con PropTypes

### Git y Commits
- **Mensajes en inglés:** Formato convencional
- **feat:** add topic creation endpoint
- **fix:** resolve response counter issue
- **style:** update topic card layout
- **Ramas:** feature/nombre, bugfix/descripcion, hotfix/descripcion
