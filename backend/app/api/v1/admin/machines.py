from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
import secrets

from app.models.machine import Machine
from app.api.deps import get_db, get_super_admin
from app.schemas.machine import MachineCreate


router = APIRouter(prefix="/admin/machines", tags=["admin"])


@router.get("/company/{company_id}")
def get_machines_by_company(
    company_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(get_super_admin),
):
    return db.query(Machine).filter(Machine.company_id == company_id).all()


@router.post("/")
def create_machine(
    machine_data: MachineCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_super_admin),
):
    machine = Machine(
        name=machine_data.name,
        description=machine_data.description,
        ideal_cycle_time=machine_data.ideal_cycle_time,
        company_id=machine_data.company_id,
        api_key=secrets.token_hex(32),  # 🔥 genera key segura
    )

    db.add(machine)
    db.commit()
    db.refresh(machine)

    return machine
