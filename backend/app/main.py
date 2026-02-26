from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine
from app.db.base import Base
from app.api.v1 import production, machines, auth

from app.api.v1.admin import companies as admin_companies
from app.api.v1.admin import machines as admin_machines
from app.api.v1.admin import users as admin_users
from app.api.v1.admin import overview as admin_overview

from app.core.metrics import register_request
from fastapi import Request


# from backend.app.api.v1.admin import companies

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
app.include_router(auth.router, prefix="/api/v1")


# Admin routes
app.include_router(admin_companies.router, prefix="/api/v1")
app.include_router(admin_machines.router, prefix="/api/v1")
app.include_router(admin_users.router, prefix="/api/v1")
app.include_router(admin_overview.router, prefix="/api/v1")

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


@app.middleware("http")
async def count_requests(request: Request, call_next):
    register_request()
    response = await call_next(request)
    return response


@app.get("/")
def root():
    return {"message": "Backend running"}
