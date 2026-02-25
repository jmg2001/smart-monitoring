from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base
from app.api.v1 import production, machines, companies

app = FastAPI(title="Production Monitoring SaaS")

app.include_router(production.router, prefix="/api/v1")
app.include_router(machines.router, prefix="/api/v1")
app.include_router(companies.router, prefix="/api/v1")

# SOLO PARA DESARROLLO (después usamos Alembic)
Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "Backend running"}
