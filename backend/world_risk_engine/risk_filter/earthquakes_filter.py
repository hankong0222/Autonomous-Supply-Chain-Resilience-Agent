from geopy.distance import geodesic
class EarthquakeFilter:
    def __init__(self, earthquake_data):
        self.earthquake_data = earthquake_data

    def filter_earthquakes(self, route_points, threshold_km=300):
        filtered_earthquakes = []
        for eq in self.earthquake_data:
            eq_lat = eq['latitude']
            eq_lon = eq['longitude']
            if self.near_route(eq_lat, eq_lon, route_points, threshold_km):
                filtered_earthquakes.append(eq)
        return filtered_earthquakes

    def near_route(self, eq_lat, eq_lon, route_points, threshold_km=300):
        for point in route_points:
            d = geodesic((eq_lat, eq_lon), point).km
            if d < threshold_km:
                return True
        return False