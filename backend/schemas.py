from pydantic import BaseModel
from typing import Optional
from datetime import date


# User schemas
class UserBase(BaseModel):
    name: str
    email: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


# Task schemas
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "todo"
    assignee_id: Optional[int] = None
    due_date: Optional[date] = None
    priority: str = "medium"
    tags: Optional[str] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    assignee_id: Optional[int] = None
    due_date: Optional[date] = None
    priority: Optional[str] = None
    tags: Optional[str] = None


class Task(TaskBase):
    id: int
    assignee: Optional[User] = None

    class Config:
        from_attributes = True
