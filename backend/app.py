import uuid
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from dotenv import load_dotenv
import os
from uuid import UUID
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from typing import List, Optional
from backend import insert
import backend.classes as classes
import httpx
import hashlib
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm





load_dotenv(dotenv_path="C:/Users/kier0/mega_canvas/backend/.env")

print(dir(classes))


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

HEADERS = {
    "apikey": SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}


supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    try:
        return {"status": "connected"}
    except Exception as e:
        return {"status": "error", "details": str(e)}

def verify_student_id(hashed_id: str) -> Optional[UUID]:
    """
    Verify a hashed student ID by comparing it with stored hashes in the database.
    Returns the original student UUID if found, None otherwise.
    """
    # Get all students and their IDs
    response = supabase.table("student").select("student_id").execute()
    if response.error:
        raise HTTPException(status_code=500, detail="Database error")
    
    # Check each student ID
    for student in response.data:
        student_id = student['student_id']
        # Hash the student ID and compare
        if hash_student_id(str(student_id)) == hashed_id:
            return UUID(student_id)
    
    return None

@app.get("/student_dashboard")
async def student_dashboard(hashed_stu_id: str = Depends(get_current_student)):
    student_id = verify_student_id(hashed_stu_id)
    if not student_id:
        raise HTTPException(status_code=404, detail="Student not found")
        
    response = supabase.table("enrollment").select("""
    class_id,
    classes (
        class_id,
        name,
        period,
        faculty_id
    )
""").eq("student_id", str(student_id)).execute()
    
    if response.error:
        return {"status": "error", "message": response.error}
    return response.data
    
@app.get("/class")
def get_class(class_id: UUID):
    response = supabase.table("resources").select("*").eq("class_id", class_id).execute()
    if response.error:
        return {"status": "error", "message": response.error}
    return response.data

@app.get("/resource")
def get_resource(resource_id: UUID):
    response = supabase.table("resources").select("*").eq("resource_id", resource_id).execute() #will return either an S3 link or supabase storage link
    if response.error:
        return {"status": "error", "message": response.error}
    return response.data

@app.get("/assignment")
def load_assignment(assign_id: UUID):
    response = supabase.table("assignments").select("*").eq("assignment_id", assign_id).execute()
    if response.error:
        return {"status": "error", "message": response.error}
    return response.data

@app.get("/todo_short")
async def load_todo_short(hashed_stu_id: str = Depends(get_current_student)):
    student_id = verify_student_id(hashed_stu_id)
    if not student_id:
        raise HTTPException(status_code=404, detail="Student not found")
        
    now = datetime.now(timezone.utc)
    two_weeks_later = now + timedelta(weeks=2)

    # Get all class_ids for the student
    enrollment_response = supabase.table("enrollment").select("class_id").eq("student_id", str(student_id)).execute()
    class_ids = [record['class_id'] for record in enrollment_response.data]

    if not class_ids:
        return {"status": "error", "message": "No classes found for student."}

    # Get assignments
    assignment_response = supabase.table("assignments").select("""
        assignment_id,
        name,
        due_date,
        submission
    """).is_("submission", None) \
      .in_("class_id", class_ids) \
      .gte("due_date", now.isoformat()) \
      .lte("due_date", two_weeks_later.isoformat()) \
      .execute()
    
    if assignment_response.error:
        return {"status": "error", "message": assignment_response.error}

    return assignment_response.data

@app.get("/student")
async def get_student(hashed_stu_id: str = Depends(get_current_student)):
    student_id = verify_student_id(hashed_stu_id)
    if not student_id:
        raise HTTPException(status_code=404, detail="Student not found")
        
    response = supabase.table("student").select("*").eq("student_id", str(student_id)).execute()
    
    if response.error:
        return {"status": "error", "message": response.error}
    return response.data

@app.get("/admin_dashboard")
def admin_dashboard(fac_id: UUID):
    response = supabase.table("classes").select("""
        class_id, 
        name,
        period """).eq("faculty_id", fac_id).execute()
    if response.error:
        return {"status": "error", "message": response.error}
    return response.data

@app.get("/student_gradebook")
def student_gradebook(hashed_stu_id: str, class_id: UUID):
    student_id = verify_student_id(hashed_stu_id)
    if not student_id:
        raise HTTPException(status_code=404, detail="Student not found")
        
    response = supabase.table("gradebook").select("""
        assignment_id,
        grade,
        class_low,
        class_average,
        class_high,
        class_id, 
        student_id                                                                                                                                                                                                                                                      
""").eq("student_id", str(student_id)).eq("class_id", class_id).execute()
    if response.error:
        return {"status": "error", "message": response.error}
    return response.data

@app.get("/instructor_gradebook")
def instructor_gradebook(class_id: UUID):
    response = supabase.table("gradebook").select("""
        assignment_id,
        grade,
        class_low,
        class_average,
        class_high,
        class_id, 
        student_id                                                                                                                                                                                                                                                      
""").eq("class_id", class_id).execute()
    if response.error:
        return {"status": "error", "message": response.error}
    return response.data

@app.get("/assignment_by_date")
def get_assignment_by_date(date: datetime):
    response = supabase.table("assignment").select("*").eq("due_date", date).execute()
    if response.error:
        return {"status": "error", "message": response.error}
    return response.data

@app.post("/enroll")
def enroll_student(enrollment: classes.EnrollmentCreate):
    data = enrollment.model_dump()
    existing = supabase.table("enrollment") \
    .select("*") \
    .eq("student_id", str(enrollment.student_id)) \
    .eq("class_id", str(enrollment.class_id)) \
    .maybe_single() \
    .execute()

    if existing.data:
        raise HTTPException(status_code=400, detail="Student is already enrolled in this class.")

@app.post("/users/")
async def create_user(user: classes.UserCreate):
    return await insert.insert_row("users", user.model_dump())

@app.post("/messages/")
async def create_message(message: classes.MessageCreate):
    return await insert.insert_row("messages", message.model_dump())

@app.post("/assignments/")
async def create_assignment(assignment: classes.AssignmentCreate):
    return await insert.insert_row("assignment", assignment.model_dump())

@app.post("/classes/")
async def create_class(cls: classes.ClassCreate):
    return await insert.insert_row("classes", cls.model_dump())

@app.post("/submissions/")
async def create_submission(
    assignment_id: UUID = Form(...),
    student_id: UUID = Form(...),
    text_response: str = Form(None),
    file: UploadFile = File(None)
):
    file_url = None

    if file:
        path_in_bucket = f"{assignment_id}/{student_id}/{file.filename}"
        file_url = await insert.upload_file_to_supabase(file, path_in_bucket)

    submission_data = {
        "assignment_id": assignment_id,
        "student_id": student_id,
        "text_response": text_response,
        "file_url": file_url,
        "submitted_at": datetime.now(timezone.utc)
    }

    return await insert.insert_row("submissions", submission_data)

@app.post("/resources/")
async def create_resource(
    class_id: UUID = Form(...),
    title: str = Form(...),
    week: str = Form(...),
    page_content: str = Form(None),
    file: UploadFile = File(...)
):
    # Generate a new UUID for the resource (if not auto-generated by the DB)
    resource_id = uuid.uuid4()

    # Upload the file to Supabase Storage
    path_in_bucket = f"resources/{class_id}/{resource_id}_{file.filename}"
    file_url = await insert.upload_file_to_supabase(file, path_in_bucket)

    resource_data = {
        "resource_id": resource_id,
        "class_id": class_id,
        "title": title,
        "week": week,
        "page_content": page_content,
        "file_url": file_url
    }

    return await insert.insert_row("resources", resource_data)

# Add new Pydantic models for authentication
class Token(BaseModel):
    access_token: str
    token_type: str
    hashed_student_id: str

class TokenData(BaseModel):
    student_id: Optional[str] = None

class StudentLogin(BaseModel):
    student_id: str
    password: str

# Add OAuth2 setup
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Helper function to hash student ID
def hash_student_id(student_id: str) -> str:
    return hashlib.sha256(str(student_id).encode()).hexdigest()

# Add authentication endpoint
@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # Hash the student ID
    hashed_id = hash_student_id(form_data.username)
    
    # Check if student exists in database
    response = supabase.table("student").select("student_id").execute()
    if response.error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error",
        )
    
    # Check if any student ID matches the hashed ID
    student_exists = False
    for student in response.data:
        if hash_student_id(student['student_id']) == hashed_id:
            student_exists = True
            break
    
    if not student_exists:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account not found. Please register first.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # In a real implementation, you would verify the password here
    # For now, we'll just check if it's not empty
    if not form_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect student ID or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate a simple token (in production, use JWT or similar)
    access_token = hashlib.sha256(f"{form_data.username}{datetime.now(timezone.utc)}".encode()).hexdigest()
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "hashed_student_id": hashed_id
    }

# Add a protected route example
async def get_current_student(token: str = Depends(oauth2_scheme)):
    # In a real implementation, you would verify the token here
    # For now, we'll just return the token as the student ID
    return token

@app.get("/me")
async def read_student_me(current_student: str = Depends(get_current_student)):
    return {"student_id": current_student}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)