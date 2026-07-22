# TusRemesasYA

Version: 0.1.3
![Estado](https://img.shields.io/badge/status-en%20desarrollo-yellow)

## Instrucciones
### 1. Autenticar en GHCR (si el paquete es privado)
```shell
echo $GHCR_TOKEN | sudo docker login ghcr.io -u gabrielbaute --password-stdin
```
### 2. Crear directorios
```shell
sudo mkdir logs
sudo mkdir instance
sudo chown -R 1000:1000 ./logs ./instance
```
### 3. Descargar la versión más reciente
```shell
sudo docker compose pull
```

### 4. Levantar el servicio en segundo plano
```shell
sudo docker compose up -d --remove-orphans
```