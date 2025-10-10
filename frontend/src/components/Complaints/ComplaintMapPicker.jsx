// ComplaintMapPicker.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Handles click events on the map
function LocationMarker({ position, setPosition, onSelect }) {
  const map = useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      map.setView([lat, lng], map.getZoom());

      // ✅ Call OpenStreetMap reverse geocode directly (no backend)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`
        );

        if (!res.ok) throw new Error("Reverse geocode request failed");
        const data = await res.json();

        const address = data.display_name || "Unknown location";
        onSelect({ latitude: lat, longitude: lng, address });
      } catch (err) {
        console.error("Reverse geocode failed:", err);
        onSelect({ latitude: lat, longitude: lng, address: "" });
      }
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

const ComplaintMapPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState([28.6139, 77.209]); // Default: New Delhi

  // ✅ Auto-detect user location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
            );

            if (!res.ok) throw new Error("Reverse geocode failed");
            const data = await res.json();

            const address = data.display_name || "Unknown location";
            onLocationSelect({ latitude, longitude, address });
          } catch (err) {
            console.error("Reverse geocode failed:", err);
            onLocationSelect({ latitude, longitude, address: "" });
          }
        },
        (err) => {
          console.warn("Geolocation denied or unavailable:", err);
        }
      );
    }
  }, []);

  return (
    <div className="mt-4 w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-md">
      <MapContainer center={position} zoom={13} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <LocationMarker
          position={position}
          setPosition={setPosition}
          onSelect={onLocationSelect}
        />
      </MapContainer>
    </div>
  );
};

export default ComplaintMapPicker;
