from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.company import CompanyCreate
from app.models.company import Company
from app.api.deps import get_db

router = APIRouter()


@router.post("/companies")
def create_company(data: CompanyCreate, db: Session = Depends(get_db)):
    company = Company(name=data.name)

    db.add(company)
    db.commit()
    db.refresh(company)

    return company
