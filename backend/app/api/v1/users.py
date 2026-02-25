from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/")
def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    # Solo super admin puede crear usuarios
    if current_user.role != "super_admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    existing = db.query(User).filter(User.email == user_data.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        company_id=user_data.company_id,
        role=user_data.role
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created successfully"}