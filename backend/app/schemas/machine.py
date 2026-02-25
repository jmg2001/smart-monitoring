from pydantic import BaseModel
from uuid import UUID
from typing import Optional


class MachineCreate(BaseModel):
    name: str
    description: Optional[str] = None
    ideal_cycle_time: Optional[float] = None
    company_id: UUID
