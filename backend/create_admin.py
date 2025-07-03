from app.database import SessionLocal
from app.models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_admin():
    db = SessionLocal()
    try:
        # Check if admin already exists
        existing_admin = db.query(User).filter(User.email == "admin@studyguide.com").first()
        if existing_admin:
            print("Admin user already exists!")
            return
        
        # Create admin user
        admin = User(
            email="admin@studyguide.com",
            password_hash=pwd_context.hash("366399022006"),
            role="admin",
            name="System Administrator",
            status="approved"
        )
        db.add(admin)
        db.commit()
        print("Admin user created successfully!")
        print("Email: admin@studyguide.com")
        print("Password: 366399022006")
    except Exception as e:
        print(f"Error creating admin: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin() 