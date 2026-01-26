import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent({ location }) {
  if (!location) return null;

  return (
    <MapContainer center={[location.lat, location.lng]} zoom={13} className="h-64 w-full rounded-xl">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lng]}>
        <Popup>{location.name}</Popup>
      </Marker>
    </MapContainer>
  );
}
