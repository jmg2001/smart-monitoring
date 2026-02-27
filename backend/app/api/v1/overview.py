from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.machine import Machine
from app.models.user import User
from app.models.production_record import ProductionRecord
from app.api.deps import get_current_user, get_db
from datetime import date

router = APIRouter(prefix="/overview")


@router.get("/")
def get_overview(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    total_machines = (
        db.query(func.count(Machine.id))
        .filter(Machine.company_id == current_user.company_id)
        .scalar()
    )
    total_users = (
        db.query(func.count(User.id))
        .filter(User.company_id == current_user.company_id)
        .scalar()
    )
    total_records = (
        db.query(func.count(ProductionRecord.id))
        .filter(ProductionRecord.company_id == current_user.company_id)
        .scalar()
    )

    # Máquinas activas hoy (que reportaron producción hoy)
    today = date.today()

    active_machines_today = (
        db.query(func.count(func.distinct(ProductionRecord.machine_id)))
        .filter(ProductionRecord.company_id == current_user.company_id)
        .filter(func.date(ProductionRecord.timestamp) == today)
        .scalar()
    )

    return {
        "total_machines": total_machines,
        "total_users": total_users,
        "total_records": total_records,
        "active_machines_today": active_machines_today,
    }
