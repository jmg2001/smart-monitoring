from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ProductionCreate(BaseModel):
    count_value: int
    status: str
    timestamp: Optional[datetime] = None
