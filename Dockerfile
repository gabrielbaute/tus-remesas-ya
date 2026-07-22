# ==========================================
# Etapa 0: Builder Frontend (Deno + Vue 3 -> Bundle)
# ==========================================
FROM denoland/deno:alpine AS ui-builder

WORKDIR /app

# Copiar manifiesto y lockfile del frontend
COPY app/ui/deno.json app/ui/deno.lock ./

# Instalar dependencias del frontend
RUN deno install

# Copiar el código fuente completo de la interfaz
COPY app/ui/ ./

# Instalar git para obtener el hash del commit (Alpine)
# e inyectar la fecha UTC real y el hash automáticamente
RUN apk add --no-cache git && \
    BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') && \
    VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "local") && \
    echo "ui-build-ref=${VCS_REF} ui-build-date=${BUILD_DATE}" > /tmp/ui-build-info.txt && \
    apk del git

# Generar el bundle de producción (resultado en /app/dist)
RUN deno task build

# ==========================================
# Etapa 1: Builder Backend (Python con uv)
# ==========================================
FROM python:3.11-slim AS builder

# Evitar la generación de bytecode (.pyc)
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Extraer el binario de 'uv' desde la imagen oficial
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Sincronización de dependencias del backend usando caché
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    uv sync --frozen --no-install-project --no-dev

# ==========================================
# Etapa 2: Imagen Final de Producción (Runtime)
# ==========================================
FROM python:3.11-slim AS runtime

# Variables de entorno del runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    LOG_DIR="/logs" \
    INSTANCE_DIR="/instance" \
    API_PORT=8000 \
    API_HOST="0.0.0.0"

# Añadir el entorno virtual al PATH global
ENV PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Instalación de utilidades esenciales para healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Crear usuario sin privilegios y carpetas del sistema
RUN groupadd -r tus_remesas_ya -g 1000 && \
    useradd -u 1000 -g tus_remesas_ya -m -s /bin/bash tus_remesas_ya && \
    mkdir -p /logs /instance && \
    chown -R tus_remesas_ya:tus_remesas_ya /logs /instance /app

# Copiar el entorno virtual con las dependencias instaladas
COPY --from=builder --chown=tus_remesas_ya:tus_remesas_ya /app/.venv /app/.venv

# Copiar el código fuente del proyecto
COPY --chown=tus_remesas_ya:tus_remesas_ya . .

# Copiar los estáticos compilados a la ruta esperada por la API (app/ui/dist)
COPY --from=ui-builder --chown=tus_remesas_ya:tus_remesas_ya /app/dist /app/app/ui/dist

# Verificación de estado del servicio
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:${API_PORT}/health || exit 1

EXPOSE 8000

USER tus_remesas_ya

# Comando de ejecución del backend
CMD ["sh", "-c", "uvicorn app.main:app --host ${API_HOST} --port ${API_PORT}"]