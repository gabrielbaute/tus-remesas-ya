"""
Module defining UI-facing routes for serving the Single Page Application (SPA).
"""
from pathlib import Path
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse

from app.services.ui_service import UIService
from app.api.dependencies import get_ui_service

router = APIRouter(tags=["UI"])

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


@router.get("/{full_path:path}", summary="Catch-all fallback route for SPA navigation")
async def serve_spa_fallback(
    full_path: str,
    ui_service: UIService = Depends(get_ui_service)
) -> FileResponse:
    """
    Fallback route for client-side routing (Vue Router). Redirection occurs
    for non-file path requests.

    Args:
        full_path (str): Requested URI path.

    Returns:
        FileResponse: Main HTML file permitting Vue Router resolution.

    Raises:
        HTTPException: 404 error if path represents a missing static asset file.
    """
    if full_path.startswith("assets/") or "." in Path(full_path).name:
        raise HTTPException(status_code=404, detail="Resource not found")

    return ui_service.get_index_file_response()