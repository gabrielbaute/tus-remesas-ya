"""
Module providing client setup utilities for serving the Single Page Application (SPA).
"""
import logging
from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.settings.app_settings import Settings
from app.api.routes.ui_routes import router as ui_router

def setup_web_client(app: FastAPI, settings: Settings) -> None:
    """
    Configures and mounts static asset delivery and UI SPA routing for the application.

    Args:
        app (FastAPI): Active FastAPI application instance.
        settings (Settings): Global application settings instance.
    """
    logger = logging.getLogger(name="SetupClient")
    dist_dir: Path = settings.BASE_DIR / "app" / "ui" / "dist"
    assets_dir: Path = dist_dir / "assets"

    # Montar el directorio de activos compilados por Vite (/assets)
    if assets_dir.is_dir():
        app.mount(
            "/assets",
            StaticFiles(directory=assets_dir),
            name="assets",
        )
        logger.info(f"Static web assets successfully mounted from: {assets_dir}")
    else:
        logger.warning(
            f"Web client assets directory not found at {assets_dir}. SPA may not load assets correctly."
        )

    # Registrar el router de la interfaz para la entrada index.html y fallback de rutas
    app.include_router(ui_router)