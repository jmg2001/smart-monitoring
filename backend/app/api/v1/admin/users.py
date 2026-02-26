from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.api.deps import get_super_admin, get_db
from app.core.security import hash_password
from uuid import UUID
import uuid

router = APIRouter(prefix="/admin/users", tags=["admin"])


@router.get("/company/{company_id}")
def get_users_by_company(
    company_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(get_super_admin),
):
    return db.query(User).filter(User.company_id == company_id).all()


@router.post("/")
def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_super_admin),
):

    if user_data.role not in ["admin", "operator"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    existing = db.query(User).filter(User.email == user_data.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        id=uuid.uuid4(),
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        role=user_data.role,
        company_id=user_data.company_id,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@router.delete("/{user_id}")
def delete_user(
    user_id: UUID, db: Session = Depends(get_db), current_user=Depends(get_super_admin)
):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.role == "super_admin":
        raise HTTPException(status_code=400, detail="Cannot delete super_admin")

    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}
