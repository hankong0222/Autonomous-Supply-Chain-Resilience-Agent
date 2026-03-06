import { useState, useCallback } from 'react'
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { riskRoutes as riskRoutesData, ROUTE_COLORS } from '../data/riskRoutes'

const riskRoutes = Array.isArray(riskRoutesData) ? riskRoutesData : []

const containerStyle = {
  width: '100%',
  height: '450px',
}

const center = { lat: 25, lng: 20 }

const darkMapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#4b6878' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#4b6878' }],
  },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4e6d70' }],
  },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6f7b85' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6f7b85' }],
  },
]

function GlobalOceanMap() {
  const [hoveredRoute, setHoveredRoute] = useState(null)

  const handlePolylineLoad = useCallback((polyline, route) => {
    if (!polyline) return
    polyline.addListener('mouseover', () => setHoveredRoute(route))
    polyline.addListener('mouseout', () => setHoveredRoute(null))
  }, [])

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDQRBkpYVEtsQkG3B36j_yyWZJXQxWBFA8"
      language="en"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        options={{ styles: darkMapStyles }}
      >
        {/* Straight-line risk routes */}
        {riskRoutes.map((route) => {
          const color = ROUTE_COLORS[route.mode] || '#00c2ff'
          return (
            <Polyline
              key={route.name}
              path={route.points}
              onLoad={(p) => handlePolylineLoad(p, route)}
              options={{
                strokeColor: color,
                strokeOpacity: 0.9,
                strokeWeight: 3,
              }}
            />
          )
        })}

        {/* Origin and destination markers */}
        {riskRoutes.map((route) => (
          <Marker key={`origin-${route.name}`} position={route.points[0]} />
        ))}
        {riskRoutes.map((route) => (
          <Marker
            key={`dest-${route.name}`}
            position={route.points[route.points.length - 1]}
          />
        ))}

        {/* Hover tooltip */}
        {hoveredRoute && (
          <InfoWindow
            position={
              hoveredRoute.points[Math.floor(hoveredRoute.points.length / 2)]
            }
            onCloseClick={() => setHoveredRoute(null)}
          >
            <div style={{ padding: '4px', minWidth: '160px', color: '#1f2937' }}>
              <div style={{ fontWeight: 600, marginBottom: '6px' }}>
                {hoveredRoute.name}
              </div>
              <div style={{ fontSize: '12px', lineHeight: 1.5 }}>
                <div>Carrier: {hoveredRoute.carrier}</div>
                <div>Mode: {hoveredRoute.mode}</div>
                <div>Shipments: {hoveredRoute.shipments}</div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default GlobalOceanMap
