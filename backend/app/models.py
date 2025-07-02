from sqlalchemy import Column, Integer, String, Enum
from app.database import Base
import enum

class UserRole(enum.Enum):
    student = "student"
    institution = "institution"
    admin = "admin"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)  # Store enum as string for SQLite compatibility
    name = Column(String(255), nullable=False)

class University(Base):
    __tablename__ = "universities"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    location = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True) 