from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.security import verify_password
from app.core.jwt import create_access_token
from app.models.user import User
from app.api.deps import get_db, get_current_user
from app.schemas.auth import LoginRequest

router = APIRouter(prefix="/auth")


@router.post("/login")
def login(credentials: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {
            "sub": str(user.id),
            "company_id": str(user.company_id) if user.company_id else None,
            "role": user.role,
        }
    )

    return {"access_token": token, "token_type": "bearer"}
