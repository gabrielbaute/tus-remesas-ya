# ==========================================
# Etapa 0: Compilación del Frontend (Fresh)
# ==========================================
FROM denoland/deno:debian AS ui-builder

# Definición del directorio de trabajo en el contenedor
WORKDIR /app

# Instalación de git para dependencias requeridas durante la compilación
RUN apt-get update && apt-get install -y --no-install-recommends git && \
    rm -rf /var/lib/apt/lists/*

# Copiar archivos de configuración e instalar dependencias con caché optimizada
COPY app/ui/deno.json app/ui/deno.lock ./
RUN deno install

# Copiar el código fuente de la interfaz gráfica
COPY app/ui/ ./

# Generar metadata de compilación y ejecutar la tarea de build del frontend
RUN BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') && \
    VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "local") && \
    deno task build

# ==========================================
# Etapa 1: Instalación de Dependencias Backend
# ==========================================
FROM python:3.11-slim AS builder

WORKDIR /app

# Extraer binarios oficiales de uv para la gestión rápida de paquetes
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Instalar dependencias backend en .venv
# NOTA: --link-mode=copy fuerza la copia física de binarios e impide enlaces
# simbólicos rotos hacia /usr/local/bin/python cuando se transfieran al runtime.
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    uv sync --frozen --no-install-project --no-dev --link-mode=copy

# ==========================================
# Etapa 2: Imagen Final de Producción (Runtime)
# ==========================================
FROM python:3.11-slim AS runtime

# Variables de entorno para optimización de ejecución en Python
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    LOG_DIR="/logs" \
    INSTANCE_DIR="/instance" \
    API_PORT=8000 \
    API_HOST="0.0.0.0"

# Inclusión del entorno virtual en el PATH del sistema
ENV PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Instalación de utilidades del sistema necesarias para healthchecks
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Creación de usuario y grupo sin privilegios (UID/GID 1000) por seguridad
RUN groupadd -r tus_remesas_ya -g 1000 && \
    useradd -u 1000 -g tus_remesas_ya -m -s /bin/bash tus_remesas_ya && \
    mkdir -p /logs /instance /app && \
    chown -R tus_remesas_ya:tus_remesas_ya /logs /instance /app

# Copia del entorno virtual asignando la propiedad directamente al usuario no-root
COPY --from=builder --chown=tus_remesas_ya:tus_remesas_ya /app/.venv /app/.venv

# Copia del código fuente del proyecto backend
COPY --chown=tus_remesas_ya:tus_remesas_ya . .

# Copia del bundle estático compilado en la Etapa 0 hacia el directorio servido por la API
COPY --from=ui-builder --chown=tus_remesas_ya:tus_remesas_ya /app/dist /app/app/ui/dist

# Comprobación de salud del contenedor
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:${API_PORT}/health || exit 1

EXPOSE 8000

# Cambio de contexto al usuario sin privilegios
USER tus_remesas_ya

# Comando de arranque del servidor ASGI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]