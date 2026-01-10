Plan: Build Kanban Board with FastAPI & React
A full-stack Kanban task management system with drag-and-drop functionality, task CRUD operations, and assignee management. Backend uses FastAPI with SQLite database, frontend uses React with Tailwind CSS. Includes priority levels (Low/Medium/High with color coding) and tags (comma-separated string format).

Steps
Set up project structure and FastAPI backend - Create backend/ with backend/main.py, backend/database.py for SQLite connection, backend/models.py for Task (id, title, description, status, assignee_id, due_date, priority, tags) and User models with SQLAlchemy, backend/schemas.py for Pydantic validation schemas.

Implement task and user API endpoints - Add backend/routes/tasks.py with GET all tasks, POST create, PUT update, DELETE, PATCH status/assignee updates, and backend/routes/users.py for GET user list, configure CORS middleware in main.py.

Initialize SQLite with seed data - Create backend/init_db.py to generate kanban.db with 5 sample users (Alice, Bob, Carol, David, Emma) and 8-10 tasks distributed across columns (Todo, In Progress, Done) with varied priorities (low/medium/high), due dates, tags, and assignees.

Create React frontend with Tailwind CSS - Set up frontend/ with Vite, configure Tailwind CSS, create frontend/src/App.jsx, frontend/src/components/KanbanBoard.jsx, frontend/src/components/Column.jsx, frontend/src/components/TaskCard.jsx with @dnd-kit drag-and-drop and priority color badges.

Build task management modals and features - Create frontend/src/components/TaskModal.jsx for create/edit with all fields, frontend/src/components/AssigneeSelector.jsx dropdown, tag input with comma-separated format, and frontend/src/services/api.js for axios API client with error handling.

Add configuration and documentation - Create backend/requirements.txt (fastapi, uvicorn, sqlalchemy, pydantic), frontend/package.json (react, @dnd-kit, axios, tailwindcss), .gitignore for node_modules and kanban.db, README.md with setup instructions for both backend (uvicorn) and frontend (npm run dev).
