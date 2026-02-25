import secrets
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.machine import MachineCreate
from app.models.machine import Machine
from app.api.deps import get_db

router = APIRouter()


@router.post("/machines")
def create_machine(data: MachineCreate, db: Session = Depends(get_db)):
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
