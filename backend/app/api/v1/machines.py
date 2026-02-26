import secrets
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.machine import MachineCreate
from app.models.machine import Machine
from app.models.user import User
from app.models.production_record import ProductionRecord
from app.api.deps import get_db, get_current_user
from uuid import UUID
from datetime import datetime

router = APIRouter()


@router.post("/machines")
def create_machine(
    data: MachineCreate,
    db: Session = Depends(get_db),
    currentUser: User = Depends(get_current_user),
):
    if currentUser.company_id != data.company_id:
        return {"Error": "Invalid User Operation"}

    api_key = secrets.token_hex(32)

    machine = Machine(
        name=data.name,
        description=data.description,
        ideal_cycle_time=data.ideal_cycle_time,
        company_id=data.company_id,
        api_key=api_key,
    )

    db.add(machine)
    db.commit()
    db.refresh(machine)

    return {"machine_id": machine.id, "api_key": machine.api_key}


@router.get("/machines/{machine_id}")
def get_machine(
    machine_id: UUID,
    db: Session = Depends(get_db),
    currentUser: User = Depends(get_current_user),
):
    machine = (
        db.query(Machine)
        .filter(Machine.company_id == currentUser.company_id)
        .filter(Machine.id == machine_id)
        .first()
    )

    if not machine:
        return {"error": "Machine not found"}

    return machine


@router.get("/companies/{company_id}/machines/overview")
def company_overview(
    company_id: UUID,
    db: Session = Depends(get_db),
    currentUser: User = Depends(get_current_user),
):
    machines = (
        db.query(Machine).filter(Machine.company_id == currentUser.company_id)
        # .filter(Machine.company_id == company_id)
        .all()
    )

    overview = []

    for machine in machines:

        # Último registro
        last_record = (
            db.query(ProductionRecord)
            .filter(ProductionRecord.machine_id == machine.id)
            .order_by(ProductionRecord.timestamp.desc())
            .first()
        )

        if not last_record:
            overview.append(
                {
                    "id": machine.id,
                    "name": machine.name,
                    "status": "NO_DATA",
                    "total_production": 0,
                    "last_update_seconds": None,
                }
            )
            continue

        # Producción hoy (simple versión)
        now = datetime.utcnow()
        start = datetime(now.year, now.month, now.day)

        records_today = (
            db.query(ProductionRecord)
            .filter(
                ProductionRecord.machine_id == machine.id,
                ProductionRecord.timestamp >= start,
            )
            .order_by(ProductionRecord.timestamp)
            .all()
        )

        total_production = 0
        previous = records_today[0].count_value if records_today else 0

        for r in records_today[1:]:
            if r.count_value >= previous:
                total_production += r.count_value - previous
            else:
                total_production += r.count_value
            previous = r.count_value

        seconds_since_last = (now - last_record.timestamp).total_seconds()

        computed_status = "OFFLINE" if seconds_since_last > 30 else last_record.status

        overview.append(
            {
                "id": machine.id,
                "name": machine.name,
                "status": computed_status,
                "total_production": total_production,
                "last_update_seconds": int(seconds_since_last),
            }
        )

    return overview
