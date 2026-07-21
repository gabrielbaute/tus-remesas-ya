"""Arbitrage service module."""
import logging
from requests import Session
from datetime import datetime
from typing import List, Optional, Dict
from sqlalchemy.ext.asyncio import AsyncSession

from app.errors import RegisterNotFoundError
from app.enums import FiatCurrency, TradeType
from app.services.binance_service import BinanceService
from app.services.fiat_exchange_service import FiatExchangeService
from app.schemas import ArbitrageResponse, BinanceCurrencyResponse, FiatPairResponse

class ArbitrageService:
    def __init__(self, databasesession: AsyncSession):
        self.logger = logging.getLogger(self.__class__.__name__)
        self.binance_service = BinanceService(databasesession=databasesession)
        self.fiat_exchange_service = FiatExchangeService(databasesession=databasesession)

    def _calculate_adquisition_rate(
            self, 
            rate_1: BinanceCurrencyResponse, 
            rate_2: BinanceCurrencyResponse, 
            ignore_buy_flag: bool = True
        ) -> float:
        """
        Calcula la tasa de adquisición de los activos fiat en relación al USDT de Binance.

        Args:
            rate_1 (BinanceCurrencyResponse): Tasa de cambio de la moneda 1 (numerador).
            rate_2 (BinanceCurrencyResponse): Tasa de cambio de la moneda 2 (denominador, debe ser BUY).

        Returns:
            float: Relación de adquisión.

        Raises:
            ValueError: Si el denominador no es BUY o su rate es 0.
        """
        if rate_2.average_price == 0:
            raise ValueError("La tasa del denominador no puede ser cero (división por cero).")
        
        if ignore_buy_flag:
            return rate_1.average_price / rate_2.average_price
        
        if rate_2.trade_type != TradeType.BUY:
            raise ValueError("La tasa del denominador debe ser siempre la tasa de compra (BUY).")
        
        return rate_1.average_price / rate_2.average_price
    
    def _calculate_remesas_customer_price(
            self, 
            adquisition_rate: float, 
            reveneu_rate: float = 1.08, 
            divide: bool = True
        ) -> float:
        """
        Calcula el precio final que el prestador de servicios de remesas ofrecerá a sus clientes.

        Args:
            adquisition_rate (float): Tasa de adquisición del vendedor
            reveneu_rate (float): Tasa de ganancia del vendedor (default: 1.08, es decir 8%)
            divide (bool): Si la dirección de operación require división, se indica aquí.
        """
        if divide:
            return adquisition_rate / reveneu_rate
        
        return adquisition_rate * reveneu_rate

    async def get_today_remesas_price(self, reveneu_rate: float = 1.08) -> ArbitrageResponse:
        """
        Obtiene el costo en remesas para el día, tanto VES→PEN como PEN→VES.

        Args:
            reveneu_rate (float): Margen del vendedor (default 1.08 = 8%).

        Returns:
            ArbitrageResponse: Precios de adquisición y cliente en ambas direcciones.
        """
        fiat_pair: FiatPairResponse = await self.fiat_exchange_service.get_pair(fiat_1=FiatCurrency.VES, fiat_2=FiatCurrency.PEN)
        
        ven_to_peru_adquisition_rate = self._calculate_adquisition_rate(
            rate_1=fiat_pair.fiat_1_p2p_buy,
            rate_2=fiat_pair.fiat_2_p2p_sell
        )
        peru_to_ven_adquisition_rate = self._calculate_adquisition_rate(
            rate_1=fiat_pair.fiat_1_p2p_sell,
            rate_2=fiat_pair.fiat_2_p2p_buy
        )

        ven_to_peru_customer_price = self._calculate_remesas_customer_price(
            adquisition_rate=ven_to_peru_adquisition_rate,
            reveneu_rate=reveneu_rate,
            divide=False
        )
        peru_to_ven_customer_price = self._calculate_remesas_customer_price(
            adquisition_rate=peru_to_ven_adquisition_rate,
            reveneu_rate=reveneu_rate,
            divide=True
        )

        return ArbitrageResponse(
            peru_to_ven_adquisition_rate=peru_to_ven_adquisition_rate,
            ven_to_peru_adquisition_rate=ven_to_peru_adquisition_rate,
            ven_to_peru_customer_price=ven_to_peru_customer_price,
            peru_to_ven_customer_price=peru_to_ven_customer_price
        )