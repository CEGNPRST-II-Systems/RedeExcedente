from exceptions.exception_handlers import register_exception_handlers
from fastapi import FastAPI
from database.session import engine, Base
from database.init_db import init_db
from controllers.material_controller import router as material_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
init_db()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

app.include_router(material_router)
