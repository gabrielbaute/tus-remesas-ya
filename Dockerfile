# ==========================================
# Etapa 0: Compilación del Frontend (Fresh)
# ==========================================
FROM denoland/deno:debian AS ui-builder

WORKDIR /app

# Instalación de git requerida para la compilación del UI
RUN apt-get update && apt-get install -y --no-install-recommends git && \
    rm -rf /var/lib/apt/lists/*

COPY app/ui/deno.json app/ui/deno.lock ./
RUN deno install

COPY app/ui/ ./

RUN BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') && \
    VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "local") && \
    deno task build

# ==========================================
# Etapa 1: Runtime Unificado (Backend + App)
# ==========================================
FROM python:3.11-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    LOG_DIR="/logs" \
    INSTANCE_DIR="/instance" \
    API_PORT=8000 \
    API_HOST="0.0.0.0"

# Inyectar el entorno virtual al PATH
ENV PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Extraer los binarios de UV directamente de la imagen oficial
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Instalar utilidades esenciales del SO
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Crear usuario, grupo y directorios de persistencia con ownership
RUN groupadd -r tus-remesas-ya -g 1000 && \
    useradd -u 1000 -g tus-remesas-ya -m -s /bin/bash tus-remesas-ya && \
    mkdir -p /logs /instance /app /app/.venv && \
    chown -R tus-remesas-ya:tus-remesas-ya /logs /instance /app /logs

# Copiar archivos del proyecto
COPY --chown=tus-remesas-ya:tus-remesas-ya . .

# Copiar el bundle generado por el frontend
COPY --from=ui-builder --chown=tus-remesas-ya:tus-remesas-ya /app/dist /app/app/ui/dist

# Cambiar al usuario no privilegiado antes de instalar dependencias
USER tus-remesas-ya

# Crear el entorno virtual e instalar dependencias DIRECTAMENTE en la ubicación final
RUN --mount=type=cache,id=uv-cache,target=/home/tus-remesas-ya/.cache/uv,uid=1000,gid=1000 \
    uv sync --frozen --no-install-project --no-dev

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:${API_PORT}/health || exit 1

EXPOSE 8000

CMD ["uv", "run", "-m", "app.main"]