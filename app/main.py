"""
Main application entry point configuring lifespan handlers, schedules and logging structures.
"""
import uvicorn
from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.settings.app_settings import settings
from app.settings.app_logger import TusRemesasYaLogger
from app.database import db_manager
from app.api import create_app, register_error_handlers
from app.managers import RemesasManager

TusRemesasYaLogger.setup_logging(logs_dir=settings.LOGS_DIR, level=settings.LOG_LEVEL)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Asynchronous lifecycle manager handling initial database synchronization and background tasks.
    
    Args:
        app (FastAPI): Active application instance context.
    """
    await db_manager.init_db()
    
    databasesession = db_manager.async_session_maker()
    try:
        manager = RemesasManager(
            databasesession=databasesession,
            settings=settings
        )
        manager.start()

        yield
    
    finally:
        await databasesession.aclose()
    
app = create_app(settings=settings)
register_error_handlers(app=app)
app.router.lifespan_context = lifespan

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app", 
        host=settings.API_HOST, 
        port=int(settings.API_PORT), 
        reload=False
    )