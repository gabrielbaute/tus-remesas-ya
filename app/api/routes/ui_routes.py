"""
Module defining UI-facing routes for serving the Single Page Application (SPA).
"""
from pathlib import Path
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse

from app.services.ui_service import UIService
from app.api.dependencies import get_ui_service

router = APIRouter(tags=["UI"])


# <!-- Sirve el punto de entrada principal index.html para la raíz del sitio -->
@router.get("/", summary="Serve main SPA entrypoint")
async def serve_spa_index(
    ui_service: UIService = Depends(get_ui_service)
) -> FileResponse:
    """
    Serves the main index.html file for the root path.

    Returns:
        FileResponse: HTML entrypoint for the Vue application.
    """
    return ui_service.get_index_file_response()


# <!-- Captura de rutas secundarias para el enrutamiento dinámico de Vue Router -->
@router.get("/{full_path:path}", summary="Catch-all fallback route for SPA navigation")
async def serve_spa_fallback(
    full_path: str,
    ui_service: UIService = Depends(get_ui_service)
) -> FileResponse:
    """
    Fallback route for client-side routing (Vue Router). Redirection occurs
    for non-file path requests and non-API requests.

    Args:
        full_path (str): Requested URI path.
        ui_service (UIService): Injected UI service instance.

    Returns:
        FileResponse: Main HTML file permitting Vue Router resolution.

    Raises:
        HTTPException: 404 error if path represents static assets or API endpoints.
    """
    clean_path: str = full_path.lstrip("/")

    # Si la petición busca una ruta de la API (ej: api/v1/...), assets o un archivo con extensión
    if (
        clean_path == "api"
        or clean_path.startswith("api/")
        or clean_path.startswith("assets/")
        or "." in Path(clean_path).name
    ):
        raise HTTPException(status_code=404, detail="API route or resource not found")

    return ui_service.get_index_file_response()