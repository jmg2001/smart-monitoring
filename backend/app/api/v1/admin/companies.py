from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.company import CompanyCreate
from app.models.company import Company
from app.api.deps import get_db, get_super_admin
import uuid

router = APIRouter(prefix="/admin/companies", tags=["admin"])


@router.post("/")
def create_company(
    company_data: CompanyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_super_admin),
):

    existing = db.query(Company).filter(Company.name == company_data.name).first()

    if existing:
        raise HTTPException(status_code=400, detail="Company already exists")

    company = Company(id=uuid.uuid4(), name=company_data.name)

    db.add(company)
    db.commit()
    db.refresh(company)

    return company


@router.get("/")
def get_companies(db: Session = Depends(get_db), current_user=Depends(get_super_admin)):
    return db.query(Company).all()
