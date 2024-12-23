import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import baseUrl from "../api/baseApi";

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ShowMarkers = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get(`${baseUrl}/api/map?location=Malls%20in%20Kanpur`) // example location
      .then((response) => {
        if (response.data.status === "ok") {
          setLocations(response.data.predictions);
        }
      })
      .catch((error) => console.error("Error fetching map data:", error));
  }, []);

  return (
    <div>
      <h2>Map with Marked Locations</h2>
      <MapContainer
        center={[26.4499, 80.3319]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[
              location.geometry.location.lat,
              location.geometry.location.lng,
            ]}
            icon={customIcon}
          >
            <Popup>
              <b>{location.name}</b>
              <br />
              {location.formatted_address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ShowMarkers;
