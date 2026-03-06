import requests
from datetime import datetime

def fetch_earthquake_data():
    url = "https://api.worldmonitor.app/api/seismology/v1/list-earthquakes"

    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }

    r = requests.get(url, headers=headers)
    data = r.json()

    events = []

    for eq in data["earthquakes"]:
        
        event = {
            "id": eq["id"],
            "magnitude": eq["magnitude"],
            "place": eq["place"],
            "lat": eq["location"]["latitude"],
            "lon": eq["location"]["longitude"],
            "depth": eq["depthKm"],
            "time": datetime.fromtimestamp(eq["occurredAt"]/1000)
        }

        events.append(event)

    return events
