# Kanban Board Application

A full-stack task management system with drag-and-drop functionality. Built with FastAPI and React, it provides an intuitive interface for organizing work across customizable workflow stages.

## Features

-   **Drag-and-Drop Interface**: Seamlessly move tasks between To Do, In Progress, and Done columns
-   **Complete Task Management**: Create, edit, view, and delete tasks with full CRUD operations
-   **Rich Task Metadata**: Track title, description, status, assignee, due date, priority (High/Medium/Low), and tags
-   **Team Collaboration**: Assign tasks to team members and organize with flexible tagging
-   **RESTful API**: FastAPI backend with SQLite database and automatic API documentation
-   **Modern UI**: Responsive React interface styled with Tailwind CSS

## Technology Stack

**Backend**

-   FastAPI - Modern Python web framework with automatic API documentation
-   SQLAlchemy - ORM for database operations
-   SQLite - Lightweight, file-based database
-   Pydantic - Data validation and serialization
-   Uvicorn - Lightning-fast ASGI server

**Frontend**

-   React 18 - Component-based UI library
-   Vite - Next-generation build tool with HMR
-   Tailwind CSS - Utility-first styling framework
-   @dnd-kit - Modern drag-and-drop toolkit
-   Axios - Promise-based HTTP client

## Project Structure

```
canban_board/
├── backend/
│   ├── routes/
│   │   ├── tasks.py          # Task API endpoints
│   │   └── users.py          # User API endpoints
│   ├── database.py           # Database connection
│   ├── models.py             # SQLAlchemy models
│   ├── schemas.py            # Pydantic schemas
│   ├── main.py               # FastAPI application
│   ├── init_db.py            # Database initialization & seeding
│   └── requirements.txt      # Python dependencies
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   │   ├── KanbanBoard.jsx
    │   │   ├── Column.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskModal.jsx
    │   ├── services/
    │   │   └── api.js        # API client
    │   ├── App.jsx           # Root component
    │   └── index.css         # Global styles
    ├── package.json          # Node dependencies
    └── vite.config.js        # Vite configuration
```

## Quick Start

### Prerequisites

-   Python 3.8+
-   Node.js 16+
-   npm or yarn

### Backend Setup

1. **Navigate to backend directory**

    ```bash
    cd backend
    ```

2. **Create and activate virtual environment**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    ```

3. **Install dependencies**

    ```bash
    pip install -r requirements.txt
    ```

4. **Initialize database with sample data**

    ```bash
    python init_db.py
    ```

5. **Start the server**

    ```bash
    uvicorn main:app --reload --port 8000
    ```

    API available at: http://localhost:8000
    Interactive docs: http://localhost:8000/docs

### Frontend Setup

1. **Navigate to frontend directory**

    ```bash
    cd frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start development server**

    ```bash
    npm run dev
    ```

    Application available at: http://localhost:5173

## Usage Guide

### Managing Tasks

-   **View Tasks**: The board displays three columns (To Do, In Progress, Done) with task cards showing title, assignee, due date, priority badge, and tags
-   **Create Task**: Click **+ New Task** button, fill in details, and click **Create Task**
-   **Edit Task**: Click any task card, modify details in the modal, and click **Update Task**
-   **Move Task**: Drag and drop tasks between columns to update their status automatically
-   **Delete Task**: Open task modal and use the delete option

### Sample Data

The database initializes with:

-   5 users (Alice, Bob, Carol, David, Emma)
-   10 tasks distributed across columns with various priorities and assignees

**Reset database:**

```bash
cd backend
rm kanban.db
python init_db.py
```

## API Reference

### Tasks

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| GET    | `/api/tasks/`              | Get all tasks        |
| POST   | `/api/tasks/`              | Create a new task    |
| GET    | `/api/tasks/{id}`          | Get a specific task  |
| PUT    | `/api/tasks/{id}`          | Update a task        |
| PATCH  | `/api/tasks/{id}/status`   | Update task status   |
| PATCH  | `/api/tasks/{id}/assignee` | Update task assignee |
| DELETE | `/api/tasks/{id}`          | Delete a task        |

### Users

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/api/users/` | Get all users     |
| POST   | `/api/users/` | Create a new user |

Full API documentation available at http://localhost:8000/docs when running the backend.

## Development

**Backend**

-   FastAPI runs with auto-reload enabled for instant feedback
-   Interactive API documentation auto-generated at `/docs`
-   Database changes require server restart

**Frontend**

-   Vite provides hot module replacement (HMR) for rapid development
-   Tailwind CSS configured for utility-first styling
-   React components use modern functional patterns with hooks

## Troubleshooting

| Issue                      | Solution                                          |
| -------------------------- | ------------------------------------------------- |
| **Port 8000 in use**       | `uvicorn main:app --reload --port 8001`           |
| **Port 5173 in use**       | Vite auto-selects next available port             |
| **Database locked**        | Close all connections and restart server          |
| **API connection refused** | Verify backend is running on port 8000            |
| **CORS errors**            | Ensure CORS middleware includes your frontend URL |

## Future Enhancements

-   [ ] User authentication and authorization
-   [ ] Real-time updates with WebSockets
-   [ ] Task comments and activity log
-   [ ] File attachments
-   [ ] Advanced filtering and search
-   [ ] Custom columns and workflows
-   [ ] Task dependencies
-   [ ] Email notifications
-   [ ] Export to CSV/PDF
-   [ ] Dark mode

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is open source and available for educational purposes.
