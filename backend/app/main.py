from fastapi import FastAPI, Depends, HTTPException, status, Request, Path
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.database import SessionLocal, engine
from app.models import Base, User, University, UserRole
from pydantic import BaseModel
from typing import List, Optional
import os
from fastapi.middleware.cors import CORSMiddleware
import requests
from dotenv import load_dotenv

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

SECRET_KEY = "StudyGaidStrongPassword366399"  # Change this to a strong secret in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.password_hash):
        return None
    return user

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(db, email)
    if user is None:
        raise credentials_exception
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)):
    return current_user

def get_current_admin_user(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

def get_current_institution_or_admin(current_user: User = Depends(get_current_user)):
    if current_user.role not in ["admin", "institution"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

# Pydantic Schemas
class UserCreate(BaseModel):
    email: str
    password: str
    role: str
    name: str
    location: str | None = None
    description: str | None = None

class UserOut(BaseModel):
    id: int
    email: str
    role: str
    name: str
    status: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class UniversityCreate(BaseModel):
    name: str
    location: str
    description: Optional[str] = None

class UniversityOut(BaseModel):
    id: int
    name: str
    location: str
    description: Optional[str]
    class Config:
        orm_mode = True

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None  # e.g., 'find_major', 'university_list', etc.

class ChatResponse(BaseModel):
    response: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the StudyGuid-TJ Backend!"}

# User Registration
@app.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    # Set status based on role
    if user.role == "institution":
        status = "pending"
        # Create University record
        if not user.location or not user.description:
            raise HTTPException(status_code=400, detail="Location and description are required for institutions.")
        db_uni = University(name=user.name, location=user.location, description=user.description)
        db.add(db_uni)
        db.commit()
        db.refresh(db_uni)
    else:
        status = "approved"
    db_user = User(email=user.email, password_hash=hashed_password, role=user.role, name=user.name, status=status)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# User Login
@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

# Get Current User Profile
@app.get("/profile", response_model=UserOut)
def read_profile(current_user: User = Depends(get_current_active_user)):
    return current_user

# University CRUD
@app.post("/universities", response_model=UniversityOut)
def create_university(university: UniversityCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_institution_or_admin)):
    db_uni = db.query(University).filter(University.name == university.name).first()
    if db_uni:
        raise HTTPException(status_code=400, detail="University already exists")
    db_uni = University(**university.dict())
    db.add(db_uni)
    db.commit()
    db.refresh(db_uni)
    return db_uni

@app.get("/universities", response_model=List[UniversityOut])
def list_universities(db: Session = Depends(get_db)):
    return db.query(University).all()

@app.get("/universities/{university_id}", response_model=UniversityOut)
def get_university(university_id: int, db: Session = Depends(get_db)):
    uni = db.query(University).filter(University.id == university_id).first()
    if not uni:
        raise HTTPException(status_code=404, detail="University not found")
    return uni

@app.put("/universities/{university_id}", response_model=UniversityOut)
def update_university(university_id: int, university: UniversityCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_institution_or_admin)):
    db_uni = db.query(University).filter(University.id == university_id).first()
    if not db_uni:
        raise HTTPException(status_code=404, detail="University not found")
    for key, value in university.dict().items():
        setattr(db_uni, key, value)
    db.commit()
    db.refresh(db_uni)
    return db_uni

@app.delete("/universities/{university_id}")
def delete_university(university_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_institution_or_admin)):
    db_uni = db.query(University).filter(University.id == university_id).first()
    if not db_uni:
        raise HTTPException(status_code=404, detail="University not found")
    db.delete(db_uni)
    db.commit()
    return {"detail": "University deleted"}

# Chat endpoint
@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(chat: ChatRequest, request: Request):
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key not set.")

    # Prepare the prompt for OpenRouter
    prompt = chat.message
    if chat.context == "find_major":
        prompt = f"The user is looking for a major recommendation based on their interests: {chat.message}. Recommend a suitable major and explain why. Also, suggest universities in Tajikistan that offer this major."
    elif chat.context == "university_list":
        prompt = f"List universities in Tajikistan and provide a brief description for each."
    # Add more context handling as needed

    payload = {
        "model": "meta-llama/llama-4-scout:free",
        "messages": [
            {"role": "system", "content": "You are StudyBot, an AI assistant for StudyGuide TJ. You help users find majors, recommend universities in Tajikistan, and answer questions about studying in Tajikistan."},
            {"role": "user", "content": prompt}
        ]
    }
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(f"{OPENROUTER_BASE_URL}/chat/completions", json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()
        ai_message = data["choices"][0]["message"]["content"]
        return {"response": ai_message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@app.get("/admin/institutions/pending", response_model=List[UserOut])
def list_pending_institutions(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return db.query(User).filter(User.role == "institution", User.status == "pending").all()

@app.patch("/admin/institutions/{user_id}/approve", response_model=UserOut)
def approve_institution(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    user = db.query(User).filter(User.id == user_id, User.role == "institution").first()
    if not user:
        raise HTTPException(status_code=404, detail="Institution not found")
    user.status = "approved"
    db.commit()
    db.refresh(user)
    return user

@app.patch("/admin/institutions/{user_id}/reject", response_model=UserOut)
def reject_institution(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    user = db.query(User).filter(User.id == user_id, User.role == "institution").first()
    if not user:
        raise HTTPException(status_code=404, detail="Institution not found")
    user.status = "rejected"
    db.commit()
    db.refresh(user)
    return user

@app.get("/admin/universities", response_model=List[UniversityOut])
def list_universities_admin(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return db.query(University).all()

@app.get("/admin/users", response_model=List[UserOut])
def list_users_admin(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return db.query(User).all() 