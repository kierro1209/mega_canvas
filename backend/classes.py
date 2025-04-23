from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    name: str
    role: str
    username: str
    password: str
    email: str

class MessageCreate(BaseModel):
    content: str
    author: UUID
    chat_id: UUID

class AssignmentCreate(BaseModel):
    title: str
    due_date: datetime
    class_id: UUID
    description: Optional[str] = None

class ClassCreate(BaseModel):
    name: str
    faculty_id: UUID
    period: str
    chat_id: UUID

class SubmissionCreate(BaseModel):  # based on student_gradebook
    student_id: UUID
    class_id: UUID
    assignment_id: UUID
    grade: Optional[float] = None

class ResourceOut(BaseModel):
    resource_id: UUID
    class_id: UUID
    title: str
    week: str
    page_content: Optional[str]
    file_url: Optional[str]

class EnrollmentCreate(BaseModel):
    student_id: UUID
    class_id: UUID