"""
API Inversion of Control and Dependency Injection Module.

This module encapsulates initialization graphs for operational database sessions,
centralized configurations, and business core services inside the API route lifecycles.
"""
from pathlib import Path
from typing import AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.settings.app_settings import Settings, settings
from app.database import DatabaseManager, db_manager
from app.services import (
    BCVService,
    BinanceService,
    DolarVenezuelaService,
    FiatExchangeService,
    NtfyWebhookService,
    ArbitrageService,
    UIService
)

def get_settings_instance() -> Settings:
    """
    Provide the globally instantiated configuration state.

    Returns:
        Settings: App configuration containing environments managed by Pydantic.
    """
    return settings


def get_db_manager() -> DatabaseManager:
    """
    Provide the structural database manager instance.

    Returns:
        DatabaseManager: Centralized connection and pooling orchestrator instance.
    """
    return db_manager


def get_ntfy_service(settings_inst: Settings = Depends(get_settings_instance)) -> NtfyWebhookService:
    """
    Instantiate the notifications webhook communication channel.

    Args:
        settings_inst (Settings): Shared validated infrastructure environment metrics.

    Returns:
        NtfyWebhookService: Operational real-time alert messaging component.
    """
    return NtfyWebhookService(settings=settings_inst)


async def get_db_session(
    db_manager: DatabaseManager = Depends(get_db_manager)
) -> AsyncGenerator[AsyncSession, None]:
    """
    Generate and manage the lifecycle of an isolated transactional database session.

    Utilizes an asynchronous generator structure to safely yield control to down-stream
    API operations and enforce strict resource disposal upon termination.

    Args:
        db_mngr (DatabaseManager): The multi-pool database engine mapping reference.

    Yields:
        AsyncGenerator[AsyncSession, None]: Active transactional pipeline targeting SQLite storage layers.
    """
    async for session in db_manager.get_session():
        yield session


def get_bcv_service(databasesession: AsyncSession = Depends(get_db_session)) -> BCVService:
    """
    Inject the Banco Central de Venezuela data tracking and parsing service layer.

    Args:
        databasesession (AsyncSession): Scoped transactional interface bound to the current request.

    Returns:
        BCVService: Bound functional logic matching official currency updates.
    """
    return BCVService(databasesession=databasesession)


def get_binance_service(databasesession: AsyncSession = Depends(get_db_session)) -> BinanceService:
    """
    Inject the Binance P2P metrics calculation and ledger extraction engine.

    Args:
        databasesession (AsyncSession): Scoped transactional interface bound to the current request.

    Returns:
        BinanceService: Configured component pointing to P2P order books.
    """
    return BinanceService(databasesession=databasesession)


def get_dolar_vzla_service(
    database_session: AsyncSession = Depends(get_db_session)
) -> DolarVenezuelaService:
    """
    Inject the unified synthetic market index calculator for the Venezuelan context.

    Args:
        database_session (AsyncSession): Scoped transactional interface bound to the current request.

    Returns:
        DolarVenezuelaService: Encapsulated service computing averages between parallel and official data.
    """
    return DolarVenezuelaService(database_session=database_session)


def get_fiat_exchange_service(
    databasesession: AsyncSession = Depends(get_db_session)
) -> FiatExchangeService:
    """
    Inject the cross-currency fiat conversion service utilizing cross-rate calculations.

    Args:
        databasesession (AsyncSession): Scoped transactional interface bound to the current request.

    Returns:
        FiatExchengeService: Active service tracking foreign pairs and exchange indices.
    """
    return FiatExchangeService(databasesession=databasesession)

def get_arbitrage_service(
        databasesession: AsyncSession = Depends(get_db_session)
) -> ArbitrageService:
    """
    Inject the cross-currency fiat conversion service for arbitrage operations.

    Args:
        databasesession (AsyncSession): Scoped transactional interface bound to the current request.

    Returns:
        FiatExchengeService: Active service for arbitrage operations.
    """
    return ArbitrageService(databasesession=databasesession)

def get_ui_service(
        settings: Settings = Depends(get_settings_instance)
) -> UIService:
    """
    Inject de ui service for provide static files.

    Args:
        ui_directory (Path): path to the static files
    
    Returns:
        UIService: Active servie to serve static files.
    """
    ui_directory: Path = settings.BASE_DIR / "app" / "ui" / "dist"
    return UIService(ui_directory=ui_directory)