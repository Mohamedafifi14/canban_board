from datetime import date, timedelta
from database import engine, SessionLocal, Base
import models


def init_database():
    """Initialize database with tables and seed data"""
    # Create all tables
    Base.metadata.create_all(bind=engine)

    # Create a session
    db = SessionLocal()

    try:
        # Check if data already exists
        existing_users = db.query(models.User).count()
        if existing_users > 0:
            print("Database already has data. Skipping seed.")
            return

        # Create sample users
        users_data = [
            {"name": "Alice Johnson", "email": "alice@example.com"},
            {"name": "Bob Smith", "email": "bob@example.com"},
            {"name": "Carol Williams", "email": "carol@example.com"},
            {"name": "David Brown", "email": "david@example.com"},
            {"name": "Emma Davis", "email": "emma@example.com"},
        ]

        users = []
        for user_data in users_data:
            user = models.User(**user_data)
            db.add(user)
            users.append(user)

        db.commit()

        # Refresh to get IDs
        for user in users:
            db.refresh(user)

        # Create sample tasks
        today = date.today()
        tasks_data = [
            {
                "title": "Design new landing page",
                "description": "Create mockups for the new product landing page",
                "status": "todo",
                "assignee_id": users[0].id,
                "due_date": today + timedelta(days=5),
                "priority": "high",
                "tags": "design,frontend,urgent",
            },
            {
                "title": "Fix login bug",
                "description": "Users are unable to login with special characters in password",
                "status": "in_progress",
                "assignee_id": users[1].id,
                "due_date": today + timedelta(days=2),
                "priority": "high",
                "tags": "bug,backend,security",
            },
            {
                "title": "Update documentation",
                "description": "Add API documentation for new endpoints",
                "status": "todo",
                "assignee_id": users[2].id,
                "due_date": today + timedelta(days=7),
                "priority": "medium",
                "tags": "documentation,api",
            },
            {
                "title": "Implement dark mode",
                "description": "Add dark mode theme to the application",
                "status": "todo",
                "assignee_id": None,
                "due_date": today + timedelta(days=14),
                "priority": "low",
                "tags": "feature,ui,enhancement",
            },
            {
                "title": "Setup CI/CD pipeline",
                "description": "Configure automated testing and deployment",
                "status": "in_progress",
                "assignee_id": users[3].id,
                "due_date": today + timedelta(days=3),
                "priority": "high",
                "tags": "devops,automation",
            },
            {
                "title": "Code review for PR #123",
                "description": "Review and approve pull request for new feature",
                "status": "in_progress",
                "assignee_id": users[4].id,
                "due_date": today + timedelta(days=1),
                "priority": "medium",
                "tags": "review,code-quality",
            },
            {
                "title": "Optimize database queries",
                "description": "Improve performance of slow queries in the reporting module",
                "status": "done",
                "assignee_id": users[1].id,
                "due_date": today - timedelta(days=2),
                "priority": "medium",
                "tags": "performance,database,backend",
            },
            {
                "title": "User onboarding flow",
                "description": "Design and implement step-by-step onboarding for new users",
                "status": "done",
                "assignee_id": users[0].id,
                "due_date": today - timedelta(days=5),
                "priority": "high",
                "tags": "ux,feature,frontend",
            },
            {
                "title": "Security audit",
                "description": "Perform comprehensive security audit of the application",
                "status": "todo",
                "assignee_id": users[3].id,
                "due_date": today + timedelta(days=10),
                "priority": "high",
                "tags": "security,audit,critical",
            },
            {
                "title": "Mobile responsive fixes",
                "description": "Fix layout issues on mobile devices",
                "status": "done",
                "assignee_id": users[2].id,
                "due_date": today - timedelta(days=1),
                "priority": "medium",
                "tags": "mobile,responsive,ui",
            },
        ]

        for task_data in tasks_data:
            task = models.Task(**task_data)
            db.add(task)

        db.commit()

        print("✅ Database initialized successfully!")
        print(f"   Created {len(users)} users")
        print(f"   Created {len(tasks_data)} tasks")
        print(f"   - Todo: {len([t for t in tasks_data if t['status'] == 'todo'])}")
        print(
            f"   - In Progress: {len([t for t in tasks_data if t['status'] == 'in_progress'])}"
        )
        print(f"   - Done: {len([t for t in tasks_data if t['status'] == 'done'])}")

    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    init_database()
