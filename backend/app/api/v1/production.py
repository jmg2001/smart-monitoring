from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.schemas.production import ProductionCreate
from app.models.production_record import ProductionRecord
from app.api.deps import get_db, validate_api_key
from uuid import UUID

router = APIRouter()

RESET_THRESHOLD = 5


@router.post(
    "/production",
    summary="Registrar producción de máquina",
    description="""
Endpoint utilizado por dispositivos industriales para enviar datos de producción.

Requiere:
- Header X-API-KEY
- Conteo acumulado
- Estado de máquina (RUN / STOP)

Recomendado enviar timestamp en UTC.
""",
    response_description="Registro guardado correctamente",
)
def create_production(
    data: ProductionCreate,
    machine=Depends(validate_api_key),
    db: Session = Depends(get_db),
):
    record = ProductionRecord(
        machine_id=machine.id,
        company_id=machine.company_id,
        timestamp=data.timestamp or datetime.utcnow(),
        count_value=data.count_value,
        status=data.status,
    )

    db.add(record)
    db.commit()

    return {"message": "Production record saved"}


@router.get("/production/{machine_id}")
def get_production_range(
    machine_id: UUID,
    start: datetime = Query(...),
    end: datetime = Query(...),
    db: Session = Depends(get_db),
):
    records = (
        db.query(ProductionRecord)
        .filter(
            ProductionRecord.machine_id == machine_id,
            ProductionRecord.timestamp >= start,
            ProductionRecord.timestamp <= end,
        )
        .order_by(ProductionRecord.timestamp)
        .all()
    )

    return records


@router.get("/machines/{machine_id}/summary")
def machine_summary(
    machine_id: UUID,
    start: datetime = Query(...),
    end: datetime = Query(...),
    db: Session = Depends(get_db),
):
    records = (
        db.query(ProductionRecord)
        .filter(
            ProductionRecord.machine_id == machine_id,
            ProductionRecord.timestamp >= start,
            ProductionRecord.timestamp <= end,
        )
        .order_by(ProductionRecord.timestamp)
        .all()
    )

    if not records or len(records) < 2:
        return {
            "total_production": 0,
            "reset_events": 0,
            "anomaly_events": 0,
            "avg_per_hour": 0,
            "last_status": None,
            "last_count": None,
            "records_analyzed": len(records),
        }

    total = 0
    resets = 0
    anomalies = 0

    previous = records[0].count_value

    for record in records[1:]:
        current = record.count_value

        if current >= previous:
            delta = current - previous
            total += delta

        else:
            drop = previous - current

            if drop > RESET_THRESHOLD:
                # Reset real detectado
                total += current
                resets += 1
            else:
                # Anomalía pequeña (glitch)
                anomalies += 1

        previous = current

    # Calcular producción promedio por hora
    total_seconds = (records[-1].timestamp - records[0].timestamp).total_seconds()
    hours = total_seconds / 3600 if total_seconds > 0 else 1
    avg_per_hour = total / hours

    return {
        "total_production": total,
        "reset_events": resets,
        "anomaly_events": anomalies,
        "avg_per_hour": round(avg_per_hour, 2),
        "last_status": records[-1].status,
        "last_count": records[-1].count_value,
        "records_analyzed": len(records),
    }


@router.get("/machines/{machine_id}/daily")
def machine_daily_summary(machine_id: UUID, db: Session = Depends(get_db)):
    # Inicio del día en UTC
    now = datetime.utcnow()
    start = datetime(now.year, now.month, now.day)
    end = now

    records = (
        db.query(ProductionRecord)
        .filter(
            ProductionRecord.machine_id == machine_id,
            ProductionRecord.timestamp >= start,
            ProductionRecord.timestamp <= end,
        )
        .order_by(ProductionRecord.timestamp)
        .all()
    )

    if not records or len(records) < 2:
        return {
            "date": start.date(),
            "total_production": 0,
            "reset_events": 0,
            "avg_per_hour": 0,
            "last_status": None,
            "last_timestamp": None,
        }

    total = 0
    resets = 0
    previous = records[0].count_value

    for record in records[1:]:
        current = record.count_value

        if current >= previous:
            total += current - previous
        else:
            total += current
            resets += 1

        previous = current

    total_seconds = (records[-1].timestamp - records[0].timestamp).total_seconds()
    hours = total_seconds / 3600 if total_seconds > 0 else 1
    avg_per_hour = total / hours

    return {
        "date": start.date(),
        "total_production": total,
        "reset_events": resets,
        "avg_per_hour": round(avg_per_hour, 2),
        "last_status": records[-1].status,
        "last_timestamp": records[-1].timestamp,
    }


@router.get("/machines/{machine_id}/realtime")
def machine_realtime_status(machine_id: UUID, db: Session = Depends(get_db)):
    last_record = (
        db.query(ProductionRecord)
        .filter(ProductionRecord.machine_id == machine_id)
        .order_by(ProductionRecord.timestamp.desc())
        .first()
    )

    if not last_record:
        return {"status": "NO_DATA", "last_count": None, "last_timestamp": None}

    # Detectar si está en paro por inactividad
    now = datetime.utcnow()
    seconds_since_last = (now - last_record.timestamp).total_seconds()

    # Si no ha enviado datos en 30 segundos → consideramos offline
    if seconds_since_last > 30:
        computed_status = "OFFLINE"
    else:
        computed_status = last_record.status

    return {
        "status": computed_status,
        "last_count": last_record.count_value,
        "last_timestamp": last_record.timestamp,
        "seconds_since_last_update": int(seconds_since_last),
    }

@router.get("/machines/{machine_id}/last-hours")
def machine_last_hours(
    machine_id: UUID,
    hours: int = Query(2, ge=1, le=24),
    db: Session = Depends(get_db)
):
    end = datetime.utcnow()
    start = end - timedelta(hours=hours)

    records = (
        db.query(ProductionRecord)
        .filter(
            ProductionRecord.machine_id == machine_id,
            ProductionRecord.timestamp >= start,
            ProductionRecord.timestamp <= end
        )
        .order_by(ProductionRecord.timestamp)
        .all()
    )

    return [
        {
            "timestamp": r.timestamp,
            "count_value": r.count_value
        }
        for r in records
    ]