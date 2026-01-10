# Kanban Board Application

A full-stack Kanban task management system with drag-and-drop functionality, built with FastAPI (backend) and React (frontend).

## Features

-   ✅ **Drag-and-Drop**: Move tasks between columns (To Do, In Progress, Done)
-   ✅ **Task Management**: Create, edit, delete, and view tasks
-   ✅ **Task Details**: Title, description, status, assignee, due date, priority, and tags
-   ✅ **Priority Levels**: High, Medium, Low with color-coded badges
-   ✅ **Assignees**: Assign tasks to team members
-   ✅ **Tags**: Organize tasks with comma-separated tags
-   ✅ **RESTful API**: FastAPI backend with SQLite database
-   ✅ **Modern UI**: React with Tailwind CSS

## Tech Stack

### Backend

-   **FastAPI**: Modern Python web framework
-   **SQLAlchemy**: ORM for database operations
-   **SQLite**: Lightweight database
-   **Pydantic**: Data validation
-   **Uvicorn**: ASGI server

### Frontend

-   **React 18**: UI library
-   **Vite**: Fast build tool
-   **Tailwind CSS**: Utility-first CSS framework
-   **@dnd-kit**: Drag-and-drop library
-   **Axios**: HTTP client

## Project Structure

```
ad_demo/
├── backend/
│   ├── routes/
│   │   ├── tasks.py          # Task API endpoints
│   │   └── users.py          # User API endpoints
│   ├── database.py           # Database connection
│   ├── models.py             # SQLAlchemy models
│   ├── schemas.py            # Pydantic schemas
│   ├── main.py               # FastAPI app
│   ├── init_db.py            # Database initialization
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── Column.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── services/
│   │   │   └── api.js        # API client
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json          # Node dependencies
│   └── vite.config.js        # Vite configuration
└── README.md
```

## Getting Started

### Prerequisites

-   Python 3.8 or higher
-   Node.js 16 or higher
-   npm or yarn

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Create and activate a virtual environment:

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Initialize the database with seed data:

    ```bash
    python init_db.py
    ```

5. Start the FastAPI server:

    ```bash
    uvicorn main:app --reload --port 8000
    ```

    The API will be available at http://localhost:8000
    API documentation: http://localhost:8000/docs

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

    The app will be available at http://localhost:5173

## Usage

### Viewing Tasks

-   The Kanban board displays three columns: **To Do**, **In Progress**, and **Done**
-   Each task card shows the title, assignee, due date, priority, and tags

### Creating a Task

1. Click the **+ New Task** button at the top of the board
2. Fill in the task details in the modal
3. Click **Create Task** to save

### Editing a Task

1. Click on any task card
2. Modify the details in the modal
3. Click **Update Task** to save changes

### Moving Tasks

-   Drag and drop tasks between columns to change their status
-   The status updates automatically when dropped

### Deleting a Task

-   Click on a task to open the modal
-   Use the delete functionality (to be implemented)

## API Endpoints

### Tasks

-   `GET /api/tasks/` - Get all tasks
-   `POST /api/tasks/` - Create a new task
-   `GET /api/tasks/{id}` - Get a specific task
-   `PUT /api/tasks/{id}` - Update a task
-   `PATCH /api/tasks/{id}/status` - Update task status
-   `PATCH /api/tasks/{id}/assignee` - Update task assignee
-   `DELETE /api/tasks/{id}` - Delete a task

### Users

-   `GET /api/users/` - Get all users
-   `POST /api/users/` - Create a new user

## Sample Data

The database is initialized with:

-   5 sample users (Alice, Bob, Carol, David, Emma)
-   10 sample tasks with various statuses, priorities, and assignees

To reset the database:

```bash
cd backend
rm kanban.db
python init_db.py
```

## Development

### Backend Development

-   The FastAPI server runs with auto-reload enabled
-   API documentation is automatically generated at `/docs`
-   Database changes require a server restart

### Frontend Development

-   Vite provides hot module replacement (HMR)
-   Tailwind CSS is configured for utility-first styling
-   React components use functional components with hooks

## Future Enhancements

-   [ ] User authentication and authorization
-   [ ] Real-time updates with WebSockets
-   [ ] Task comments and activity log
-   [ ] File attachments
-   [ ] Task filtering and search
-   [ ] Custom columns
-   [ ] Task dependencies
-   [ ] Email notifications
-   [ ] Export to CSV/PDF
-   [ ] Dark mode

## Troubleshooting

### Backend Issues

-   **Port 8000 already in use**: Kill existing processes or use a different port

    ```bash
    uvicorn main:app --reload --port 8001
    ```

-   **Database locked**: Close all database connections and restart

### Frontend Issues

-   **Port 5173 already in use**: Vite will automatically try the next available port
-   **API connection refused**: Ensure the backend is running on port 8000
-   **CORS errors**: Check that the backend CORS middleware includes `http://localhost:5173`

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to submit issues and enhancement requests!
