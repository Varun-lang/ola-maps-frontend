import React, { useState } from "react";
import axios from "axios";
import baseUrl from "../api/baseApi";

const MapComponent = () => {
  const [location, setLocation] = useState("");
  const [mapData, setMapData] = useState(null);

  const fetchMapData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/map?location=${location}`
      );
      console.log(response.data);
      setMapData(response.data);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFetchMap = () => {
    fetchMapData();
  };

  return (
    <div>
      <h2>Ola Maps Integration</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={handleInputChange}
      />
      <button onClick={handleFetchMap}>Show Map</button>

      {mapData && (
        <div
          id="map"
          style={{ width: "600px", height: "400px", marginTop: "20px" }}
        >
          {/* Render map data here, assuming JSON contains latitude and longitude */}
          <p>Location: {location}</p>
          <p>Latitude: {mapData.latitude}</p>
          <p>Longitude: {mapData.longitude}</p>
          {/* Implement map rendering logic based on Ola Maps API, or replace with markers */}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
