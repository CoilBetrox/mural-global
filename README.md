## Mural Global

Mural Global es una aplicación web que permite crear temas y responder de forma anónima, similar a un mural público de discusión.

El objetivo del proyecto es ofrecer un espacio simple para publicar ideas, preguntas o comentarios sin necesidad de registro.

### 🧰 Tecnologías utilizadas
- Backend
  - Flask
  - Flask Blueprints
  - SQLAlchemy
  - PostgreSQL
- Frontend
  - React
  - Vite
  - TailwindCSS
- Infraestructura
  - Docker
  - Docker Compose

### 📁 Estructura del proyecto
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

### ⚙️ Configuración local (sin Docker)

#### 1. Clonar repositorio
    git clone <repo-url>  
    cd mural-global

#### 2. Backend
    Entrar al backend:
      cd mural-global-back
    Crear entorno virtual:
      python -m venv venv
      source venv/bin/activate
    Instalar dependencias:
      pip install -r requirements.txt
    Crear archivo .env:
      DATABASE_URL=postgresql:USER:PASSWORD@HOST:PORBNAME
    Ejecutar servidor:
      python run.py
    El backend quedará disponible en:
      http://localhost:5000

#### 3. Frontend
    Entrar al frontend:
      cd mural-global-front
    Instalar dependencias:
      npm install
    Ejecutar servidor:
      npm run dev
    El frontend estará disponible en:
      http://localhost:5173

### 🐳 Ejecutar con Docker

    Para levantar todos los servicios:
      docker-compose up --build
    Servicios disponibles:
    Frontend
      http://localhost:5173
    Backend
      http://localhost:5000

### 📌 Funcionalidades actuales
- Crear temas anónimos
- Responder temas
- API REST con Flask
- Frontend React

### 🚀 Próximas mejoras
- Sistema de likes
- Ordenar temas por popularidad
- Paginación
- Reporte de contenido
- Moderación básica