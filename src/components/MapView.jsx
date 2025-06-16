import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocations } from '../hooks/useLocations';
import L from 'leaflet';
import { useState, useEffect } from 'react';

const customIcon = new L.Icon({
  iconUrl: '/green-marker.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const defaultIcon = new L.Icon.Default();

const MapView = () => {
  const { locations, loading, error } = useLocations();

  const [userPosition, setUserPosition] = useState(null);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation tidak didukung browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        setGeoError(err.message);
      }
    );
  }, []);

  if (loading) return <div>Loading lokasi...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(locations) || locations.length === 0)
    return <div>Tidak ada lokasi tersedia.</div>;

  return (
    <>
      {geoError && <div style={{ color: 'red' }}>{geoError}</div>}

      <MapContainer
        center={userPosition || [-6.2, 106.8]}
        zoom={userPosition ? 14 : 12}
        style={{ height: '70vh', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; Kontributor OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker lokasi dari database */}
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[parseFloat(loc.latitude), parseFloat(loc.longitude)]}
            icon={customIcon}
          >
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              {loc.description}
            </Popup>
          </Marker>
        ))}

        {/* Marker lokasi user */}
        {userPosition && (
          <Marker position={userPosition} icon={defaultIcon}>
            <Popup>Lokasi Kamu</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default MapView;
