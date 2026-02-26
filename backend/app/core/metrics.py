import time
import psutil
from collections import deque

# Guardamos timestamps de requests
request_times = deque()


def register_request():
    now = time.time()
    request_times.append(now)

    # Eliminar requests de más de 60 segundos
    while request_times and request_times[0] < now - 60:
        request_times.popleft()


def get_requests_per_minute():
    return len(request_times)


def get_system_metrics():
    return {
        "cpu_percent": psutil.cpu_percent(interval=0.1),
        "memory_percent": psutil.virtual_memory().percent,
        "memory_used_mb": round(psutil.virtual_memory().used / (1024 * 1024), 2),
        "memory_total_mb": round(psutil.virtual_memory().total / (1024 * 1024), 2),
        "uptime_seconds": int(time.time() - psutil.boot_time()),
    }
