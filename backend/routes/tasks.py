from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db

router = APIRouter()


@router.get("/", response_model=List[schemas.Task])
def get_all_tasks(db: Session = Depends(get_db)):
    """Get all tasks"""
    from sqlalchemy.orm import joinedload

    tasks = db.query(models.Task).options(joinedload(models.Task.assignee)).all()
    return tasks


@router.post("/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """Create a new task"""
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.get("/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """Get a specific task by ID"""
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=schemas.Task)
def update_task(
    task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)
):
    """Update a task"""
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)

    db.commit()
    db.refresh(db_task)
    return db_task


@router.patch("/{task_id}/status", response_model=schemas.Task)
def update_task_status(task_id: int, status: str, db: Session = Depends(get_db)):
    """Update only the status of a task"""
    from sqlalchemy.orm import joinedload

    db_task = (
        db.query(models.Task)
        .options(joinedload(models.Task.assignee))
        .filter(models.Task.id == task_id)
        .first()
    )
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.status = status
    db.commit()
    db.refresh(db_task)
    return db_task


@router.patch("/{task_id}/assignee", response_model=schemas.Task)
def update_task_assignee(
    task_id: int, assignee_id: int = None, db: Session = Depends(get_db)
):
    """Update the assignee of a task"""
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    if assignee_id is not None:
        user = db.query(models.User).filter(models.User.id == assignee_id).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

    db_task.assignee_id = assignee_id
    db.commit()
    db.refresh(db_task)
    return db_task


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """Delete a task"""
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}
