from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.company import Company
from app.models.machine import Machine
from app.models.user import User
from app.models.production_record import ProductionRecord
from app.api.deps import get_super_admin, get_db
from datetime import date
from app.core.metrics import get_requests_per_minute, get_system_metrics

router = APIRouter(prefix="/admin/overview", tags=["admin"])


@router.get("/")
def get_admin_overview(
    db: Session = Depends(get_db), current_user=Depends(get_super_admin)
):

    system_metrics = get_system_metrics()
    rpm = get_requests_per_minute()

    total_companies = db.query(func.count(Company.id)).scalar()
    total_machines = db.query(func.count(Machine.id)).scalar()
    total_users = db.query(func.count(User.id)).scalar()
    total_records = db.query(func.count(ProductionRecord.id)).scalar()

    # Máquinas activas hoy (que reportaron producción hoy)
    today = date.today()

    active_machines_today = (
        db.query(func.count(func.distinct(ProductionRecord.machine_id)))
        .filter(func.date(ProductionRecord.timestamp) == today)
        .scalar()
    )

    return {
        "total_companies": total_companies,
        "total_machines": total_machines,
        "total_users": total_users,
        "total_records": total_records,
        "active_machines_today": active_machines_today,
        "server": system_metrics,
        "requests_per_minute": rpm,
    }
