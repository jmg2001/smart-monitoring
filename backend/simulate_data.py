import requests
import threading
import time
import random
from datetime import datetime

# =========================
# CONFIGURACION
# =========================

ENDPOINT_URL = "http://localhost:8000/api/v1/production"

SEND_INTERVAL = 5  # segundos

# Definicion de maquinas
MACHINES = [
    {
        "name": "Máquina 1",
        "api_key": "eeb13aa339197006b7b7adc8474bc009c1d169aa02b12d2776251701cffe2919",
    },
    {
        "name": "Máquina 2",
        "api_key": "83aa9d679c84dce36532fb1694140ddc3460fd87a08c1f1fc370d0a2812681a6",
    },
    {
        "name": "Máquina 3",
        "api_key": "d5df0e22d74091e67d3cee4a3535690559beb2e428080f9057d44a1c875ecb9a",
    },
]


class MachineSimulator:
    def __init__(self, name, api_key):
        self.name = name
        self.api_key = api_key
        self.production_total = 0
        self.last_production = 0
        self.state = "STOP"

    def simulate_production(self):
        """
        Simula comportamiento:
        - 70% probabilidad de producir
        - 20% quedarse igual
        - 10% resetear contador (simula reinicio)
        """
        chance = random.random()

        if chance < 0.7:
            # Produciendo
            increment = random.randint(1, 10)
            self.production_total += increment
        elif chance < 0.9:
            # Se queda igual (STOP)
            pass
        else:
            # Reset del contador
            self.production_total = random.randint(0, 20)

    def evaluate_state(self):
        if self.production_total > self.last_production:
            self.state = "RUN"
        elif self.production_total == self.last_production:
            self.state = "STOP"
        else:
            # Si es menor, lo tomamos en cuenta (reset)
            self.state = "RUN"

        self.last_production = self.production_total

    def send_data(self):
        headers = {"Content-Type": "application/json", "X-API-KEY": self.api_key}

        payload = {
            "count_value": self.production_total,
            "status": self.state,
        }

        try:
            response = requests.post(
                ENDPOINT_URL, json=payload, headers=headers, timeout=5
            )
            print(f"[{self.name}] Sent: {payload} | Status: {response.status_code}")
        except Exception as e:
            print(f"[{self.name}] Error sending data: {e}")

    def run(self):
        while True:
            self.simulate_production()
            self.evaluate_state()
            self.send_data()
            time.sleep(SEND_INTERVAL)


def start_machine(machine_config):
    simulator = MachineSimulator(machine_config["name"], machine_config["api_key"])
    simulator.run()


if __name__ == "__main__":
    threads = []

    for machine in MACHINES:
        t = threading.Thread(target=start_machine, args=(machine,), daemon=True)
        threads.append(t)
        t.start()

    print("Simulador iniciado...")

    while True:
        time.sleep(1)
