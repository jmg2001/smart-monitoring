from pydantic import BaseModel
from uuid import UUID


class CompanyCreate(BaseModel):
    name: str
