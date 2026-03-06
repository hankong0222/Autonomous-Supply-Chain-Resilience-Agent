export const riskZones = [
  {
    id: 'south-china-sea',
    name: 'South China Sea',
    risk: 'medium', // yellow
    path: [
      { lat: 23, lng: 113 },
      { lat: 23, lng: 121 },
      { lat: 5, lng: 121 },
      { lat: 5, lng: 105 },
      { lat: 15, lng: 105 },
      { lat: 23, lng: 113 },
    ],
  },
  {
    id: 'red-sea',
    name: 'Red Sea',
    risk: 'high', // red
    path: [
      { lat: 30, lng: 32 },
      { lat: 30, lng: 43 },
      { lat: 12, lng: 43 },
      { lat: 12, lng: 32 },
      { lat: 30, lng: 32 },
    ],
  },
  {
    id: 'panama-canal',
    name: 'Panama Canal',
    risk: 'low', // green
    path: [
      { lat: 9.5, lng: -80 },
      { lat: 9.5, lng: -79.5 },
      { lat: 8.8, lng: -79.5 },
      { lat: 8.8, lng: -80 },
      { lat: 9.5, lng: -80 },
    ],
  },
]

export const RISK_COLORS = {
  low: 'rgba(34, 197, 94, 0.25)',
  medium: 'rgba(234, 179, 8, 0.3)',
  high: 'rgba(239, 68, 68, 0.35)',
}
