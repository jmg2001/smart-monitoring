from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=True)

    role = Column(String, default="operator")  # super_admin | admin | operator
    is_active = Column(Boolean, default=True)

    company = relationship("Company")
