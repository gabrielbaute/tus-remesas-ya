# ==========================================
# Etapa 0: Builder Frontend (Deno + Vue 3 -> Bundle)
# ==========================================
FROM denoland/deno:alpine AS ui-builder

WORKDIR /app

ARG VCS_REF=local
ARG BUILD_DATE=unknown

# 1. Copiar manifiesto y lockfile
COPY app/ui/deno.json app/ui/deno.lock ./

# 2. Instalar dependencias
RUN deno install

# 3. Copiar TODO el código fuente de la UI (incluyendo tsconfig, env.d.ts, src, public, etc.)
COPY app/ui/ ./

# Inyectar información de construcción
RUN echo "ui-build-ref=${VCS_REF} ui-build-date=${BUILD_DATE}" > /tmp/ui-build-info.txt

# 4. Generar el bundle de producción
RUN deno task build

# ==========================================
# Etapa 1: Builder Backend (Python con uv)
# ==========================================
FROM python:3.11-slim AS builder

# Evitar la generación de archivos .pyc en la etapa de compilación
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Extraer el binario de 'uv' directamente desde la imagen oficial
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Sincronización de dependencias usando la caché nativa de uv y montajes eficientes
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    uv sync --frozen --no-install-project --no-dev

# ==========================================
# Etapa 2: Imagen Final de Producción (Runtime)
# ==========================================
FROM python:3.11-slim AS runtime

# Variables de optimización y configuración del runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    LOG_DIR="/logs" \
    INSTANCE_DIR="/instance" \
    API_PORT=8000 \
    API_HOST="0.0.0.0"

# Inyectar el entorno virtual generado directamente al PATH global de ejecución
ENV PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Instalación de utilidades esenciales para producción (curl para HEALTHCHECK)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Crear usuario y grupo sin privilegios (tus_remesas_ya:1000) e infraestructura de directorios
RUN groupadd -r tus_remesas_ya -g 1000 && \
    useradd -u 1000 -g tus_remesas_ya -m -s /bin/bash tus_remesas_ya && \
    mkdir -p /logs /instance && \
    chown -R tus_remesas_ya:tus_remesas_ya /logs /instance /app

# Copiar el entorno virtual aislado generado por 'uv'
COPY --from=builder --chown=tus_remesas_ya:tus_remesas_ya /app/.venv /app/.venv

# Copiar la aplicación backend garantizando propiedad al usuario sin privilegios
COPY --chown=tus_remesas_ya:tus_remesas_ya . .

# Copiar el resultado compilado del frontend (dist/ de Vite) hacia la carpeta de estáticos
COPY --from=ui-builder --chown=tus_remesas_ya:tus_remesas_ya /app/dist /app/static/dist

# Diagnóstico de salud del contenedor
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:${API_PORT}/health || exit 1

# Exponer el puerto de servicio
EXPOSE 8000

# Cambiar al usuario seguro del proyecto
USER tus_remesas_ya

# Comando de arranque del servidor Uvicorn / Gunicorn
CMD ["sh", "-c", "uvicorn app.main:app --host ${API_HOST} --port ${API_PORT}"]