from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum


class MachineStatus(str, Enum):
    RUN = "RUN"
    STOP = "STOP"


class ProductionCreate(BaseModel):
    count_value: int
    status: MachineStatus
    timestamp: Optional[datetime] = None
