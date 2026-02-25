# Production Monitoring API

## Autenticación

### API Key por máquina

Header requerido:
X-API-KEY: <machine_api_key>

---

## POST /api/v1/production

Envía datos de producción desde dispositivo industrial.

Body:

{
  "count_value": int,
  "status": "RUN" | "STOP",
  "timestamp": ISO8601 (opcional)
}