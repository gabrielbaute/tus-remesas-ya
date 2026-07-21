"""
Service layer for managing UI assets and Single Page Application (SPA) delivery.
"""
import logging
from pathlib import Path
from fastapi import HTTPException
from fastapi.responses import FileResponse

from app.settings import Settings

class UIService:
    """
    Service responsible for handling and validating static UI distribution files.
    """
    def __init__(self, ui_directory: Path,) -> None:
        """
        Initializes the UIService with the UI distribution directory path.

        Args:
            ui_directory (Path): Root directory path containing compiled SPA assets.
        """
        self._ui_directory: Path = ui_directory
        self._index_file: Path = ui_directory / "index.html"
        self.logger = logging.getLogger(self.__class__.__name__)

    def get_index_file_response(self) -> FileResponse:
        """
        Validates the existence of index.html and returns a FileResponse.

        Returns:
            FileResponse: The FileResponse pointing to the SPA index.html.

        Raises:
            HTTPException: 404 status error if index.html does not exist in build path.
        """
        if not self._index_file.is_file():
            self.logger.error(f"Distribution assets not found. Run the frontend build process first")
            raise HTTPException(
                status_code=404,
                detail="Distribution assets not found. Run the frontend build process first.",
            )
        self.logger.info("Sirviendo sitio web")
        return FileResponse(path=self._index_file, media_type="text/html")