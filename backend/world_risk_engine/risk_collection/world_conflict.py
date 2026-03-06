import requests

TOKEN = "75f0daa6e009a3d9"
headers = {"x-ucdp-access-token": TOKEN}

url = "https://ucdpapi.pcr.uu.se/api/gedevents/25.1"
params = {"pagesize": 100, "page": 1}

response = requests.get(url, headers=headers, params=params)
data = response.json()

print(f"Total events: {data['TotalCount']}")
for event in data["Result"]:
    print(event["id"], event["country"])