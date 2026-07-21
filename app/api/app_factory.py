"""
FastAPI Application Factory module
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.settings import Settings
from app.api.setup_client import setup_web_client
from app.api.include_routers import include_routers

def create_app(settings: Settings) -> FastAPI:
    """
    Creates and setup the FastAPI application.

    Args:
        settings (Settings): GFeneral config application.

    Returns:
        app (FastAPI): the FastAPI application instance.
    """
    app = FastAPI(
        title=settings.APP_NAME,
        description=f"{settings.APP_NAME} API",
        version=settings.APP_VERSION,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )
    
    # Middleware para prevenir la caché del navegador en los endpoints de la API
    @app.middleware("http")
    async def add_no_cache_header(request: Request, call_next):
        response = await call_next(request)
        if request.url.path.startswith("/api"):
            response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
            response.headers["Pragma"] = "no-cache"
            response.headers["Expires"] = "0"
        return response

    include_routers(app, prefix="/api/v1")
    setup_web_client(app=app, settings=settings)

    return app