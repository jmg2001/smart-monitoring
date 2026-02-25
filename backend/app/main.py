from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base
from app.api.v1 import production, machines, companies, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Production Monitoring API",
    description="""
API para monitoreo de producción industrial.

Permite:
- Registrar empresas
- Registrar máquinas
- Enviar datos de producción vía HTTP
- Consultar históricos

Autenticación:
- API Key por máquina para envío de producción
""",
    version="1.0.0",
)

app.include_router(production.router, prefix="/api/v1")
app.include_router(machines.router, prefix="/api/v1")
app.include_router(companies.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")

# SOLO PARA DESARROLLO (después usamos Alembic)
Base.metadata.create_all(bind=engine)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Backend running"}
