export const riskRoutes = [
  {
    name: 'China → Canada',
    mode: 'ocean',
    carrier: 'MSC',
    shipments: 249,
    points: [
      { lat: 22.556, lng: 114.267 }, // Yantian Port
      { lat: 30.0, lng: 140.0 },
      { lat: 40.0, lng: 170.0 },
      { lat: 49.28, lng: -123.12 }, // Vancouver
      { lat: 43.65, lng: -79.38 }, // Toronto
    ],
  },
  {
    name: 'Germany → Canada',
    mode: 'air',
    carrier: 'CN',
    shipments: 77,
    points: [
      { lat: 48.3538, lng: 11.7861 }, // Munich
      { lat: 50.0, lng: -10.0 },
      { lat: 52.0, lng: -40.0 },
      { lat: 45.5, lng: -73.56 },
      { lat: 43.65, lng: -79.38 }, // Toronto
    ],
  },
  {
    name: 'India → Canada',
    mode: 'ocean',
    carrier: 'Maersk',
    shipments: 154,
    points: [
      { lat: 13.0827, lng: 80.2707 }, // Chennai
      { lat: 8.0, lng: 95.0 },
      { lat: 10.0, lng: 120.0 },
      { lat: 25.0, lng: 150.0 },
      { lat: 40.0, lng: 170.0 },
      { lat: 49.28, lng: -123.12 }, // Vancouver
      { lat: 43.65, lng: -79.38 }, // Toronto
    ],
  },
  {
    name: 'Mexico → Canada',
    mode: 'truck',
    carrier: 'TFI International',
    shipments: 181,
    points: [
      { lat: 32.5536, lng: -117.0347 }, // Otay Mesa
      { lat: 34.05, lng: -118.24 },
      { lat: 40.76, lng: -111.89 },
      { lat: 43.65, lng: -79.38 }, // Toronto
    ],
  },
  {
    name: 'Poland → Canada',
    mode: 'air',
    carrier: 'DHL Aviation',
    shipments: 59,
    points: [
      { lat: 54.352, lng: 18.6466 }, // Gdansk
      { lat: 56.0, lng: -5.0 },
      { lat: 52.0, lng: -40.0 },
      { lat: 45.5, lng: -73.56 },
      { lat: 43.65, lng: -79.38 }, // Toronto
    ],
  },
  {
    name: 'USA → Canada',
    mode: 'truck',
    carrier: 'Purolator Freight',
    shipments: 93,
    points: [
      { lat: 32.8998, lng: -97.0403 }, // Dallas
      { lat: 39.0997, lng: -94.5786 },
      { lat: 41.8781, lng: -87.6298 },
      { lat: 43.65, lng: -79.38 }, // Toronto
    ],
  },
  {
    name: 'Vietnam → Canada',
    mode: 'ocean',
    carrier: 'Hapag-Lloyd',
    shipments: 187,
    points: [
      { lat: 21.2187, lng: 105.8042 }, // Hanoi
      { lat: 23.0, lng: 120.0 },
      { lat: 30.0, lng: 140.0 },
      { lat: 40.0, lng: 170.0 },
      { lat: 49.28, lng: -123.12 }, // Vancouver
      { lat: 43.65, lng: -79.38 }, // Toronto
    ],
  },
]

export const ROUTE_COLORS = {
  ocean: '#00c2ff',
  air: '#9b59b6',
  truck: '#f39c12',
}
