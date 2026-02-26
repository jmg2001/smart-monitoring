from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import hash_password
from app.core.config import settings

db = SessionLocal()

user = User(
    email=settings.SUPERADMIN_EMAIL,
    password_hash=hash_password(settings.SUPERADMIN_PASSWORD),
    role="super_admin",
    company_id=None,
)

db.add(user)
db.commit()

print("Super admin created")
