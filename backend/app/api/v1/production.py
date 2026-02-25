from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.schemas.production import ProductionCreate
from app.models.production_record import ProductionRecord
from app.api.deps import get_db, validate_api_key

router = APIRouter()


@router.post("/production")
def create_production(
    data: ProductionCreate,
    machine=Depends(validate_api_key),
    db: Session = Depends(get_db),
):
    record = ProductionRecord(
        machine_id=machine.id,
        company_id=machine.company_id,
        timestamp=data.timestamp or datetime.utcnow(),
        count_value=data.count_value,
        status=data.status,
    )

    db.add(record)
    db.commit()

    return {"message": "Production record saved"}
