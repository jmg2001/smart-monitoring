import uuid
from sqlalchemy import Column, DateTime, Integer, String, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.db.base import Base


class ProductionRecord(Base):
    __tablename__ = "production_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    machine_id = Column(
        UUID(as_uuid=True), ForeignKey("machines.id", ondelete="CASCADE")
    )
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    count_value = Column(Integer)
    status = Column(String)

    __table_args__ = (Index("idx_machine_timestamp", "machine_id", "timestamp"),)
