from pydantic import BaseModel, ConfigDict

class ArbitrageResponse(BaseModel):
    """
    Esquema de respuesta de los cálculos de arbitraje entre dos monedas fiat con base a una tercera moneda (e.g.: USDT).

    Attributes:
        ven_to_peru_adquisition_rate (float): Tasa de adquisición del negocio para enviar de Venezuela a Perú.
        peru_to_ven_adquisition_rate (float): Tasa de adquisición del negocio para enviar de Perú a Venezuela.
        ven_to_peru_customer_price (float): Precio de las remesas para el cliente de Venezuela a Perú.
        peru_to_ven_customer_price (float): Precio de las remesas para el cliente de Perú a Venezuela.
    """
    ven_to_peru_adquisition_rate: float
    peru_to_ven_adquisition_rate: float
    ven_to_peru_customer_price: float
    peru_to_ven_customer_price: float

    model_config = ConfigDict(
        from_attributes=True,
        use_enum_values=True,
        json_schema_extra={
            "examples": [
                {
                    "ven_to_peru_adquisition_rate": 231.2,
                    "peru_to_ven_adquisition_rate": 0.08,
                    "ven_to_peru_customer_price": 250.0,
                    "peru_to_ven_customer_price": 0.09
                }
            ]
        }
    )