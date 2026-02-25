from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base

app = FastAPI(title="Member Management SaaS")

# SOLO PARA DESARROLLO (después usamos Alembic)
Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "Backend running"}
