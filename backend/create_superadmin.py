from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import hash_password
import uuid

db = SessionLocal()

user = User(
    email="jmg357159@gmail.com",
    password_hash=hash_password("Sios2280"),
    role="super_admin",
    company_id=None,
)

db.add(user)
db.commit()

print("Super admin created")
