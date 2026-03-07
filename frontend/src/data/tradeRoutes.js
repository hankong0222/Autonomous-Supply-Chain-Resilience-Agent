export const tradeRoutes = [
  {
    id: 'china-canada',
    name: 'China → Canada',
    origin: { lat: 22.556, lng: 114.267 }, // Yantian
    destination: { lat: 43.65, lng: -79.38 }, // Toronto
    mode: 'ocean',
    carrier: 'MSC',
    shipments: 249,
  },
  {
    id: 'germany-canada',
    name: 'Germany → Canada',
    origin: { lat: 48.3538, lng: 11.7861 }, // Munich area
    destination: { lat: 43.65, lng: -79.38 }, // Toronto
    mode: 'air',
    carrier: 'CN',
    shipments: 77,
  },
  {
    id: 'india-canada',
    name: 'India → Canada',
    origin: { lat: 13.0827, lng: 80.2707 }, // Chennai
    destination: { lat: 43.65, lng: -79.38 }, // Toronto
    mode: 'ocean',
    carrier: 'Maersk',
    shipments: 154,
  },
]

export const TRANSPORT_COLORS = {
  ocean: '#0077ff',
  air: '#8e44ad',
  truck: '#f39c12',
}
