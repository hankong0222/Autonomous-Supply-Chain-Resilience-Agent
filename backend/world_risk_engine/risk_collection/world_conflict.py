import requests

url = "https://api.worldmonitor.app/api/climate/v1/list-climate-anomalies"

headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json"
}

r = requests.get(url, headers=headers)
data = r.json()

print(data)