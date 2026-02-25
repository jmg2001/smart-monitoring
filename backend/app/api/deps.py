from fastapi import Header, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.machine import Machine


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def validate_api_key(
    x_api_key: Annotated[str, Header(description="API Key única de la máquina")],
    db: Session = Depends(get_db),
):
    machine = db.query(Machine).filter(Machine.api_key == x_api_key).first()

    if not machine:
        raise HTTPException(status_code=401, detail="Invalid API Key")

    return machine
