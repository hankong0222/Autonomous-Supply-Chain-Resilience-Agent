/**
 * Generate points along a great-circle route between two coordinates.
 * Uses spherical linear interpolation for accurate geodesic paths.
 * @param {Object} start - { lat, lng }
 * @param {Object} end - { lat, lng }
 * @param {number} segments - Number of intermediate segments (default 60)
 * @returns {Array<{lat: number, lng: number}>}
 */
export function generateGreatCirclePoints(start, end, segments = 60) {
  const toRad = (deg) => (deg * Math.PI) / 180
  const toDeg = (rad) => (rad * 180) / Math.PI

  const latLngToVector = (lat, lng) => {
    const phi = toRad(90 - lat)
    const theta = toRad(lng)
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
    }
  }

  const vectorToLatLng = (v) => {
    const phi = Math.acos(Math.max(-1, Math.min(1, v.z)))
    const theta = Math.atan2(v.y, v.x)
    return { lat: toDeg(90 - phi), lng: toDeg(theta) }
  }

  const slerp = (v1, v2, t) => {
    const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
    const theta = Math.acos(Math.max(-1, Math.min(1, dot)))
    const sinTheta = Math.sin(theta)
    if (sinTheta < 1e-6) return { ...v1 }
    const a = Math.sin((1 - t) * theta) / sinTheta
    const b = Math.sin(t * theta) / sinTheta
    return {
      x: a * v1.x + b * v2.x,
      y: a * v1.y + b * v2.y,
      z: a * v1.z + b * v2.z,
    }
  }

  const v1 = latLngToVector(start.lat, start.lng)
  const v2 = latLngToVector(end.lat, end.lng)

  const points = []
  for (let i = 0; i <= segments; i++) {
    const fraction = i / segments
    const v = slerp(v1, v2, fraction)
    points.push(vectorToLatLng(v))
  }
  return points
}
