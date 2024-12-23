import React, { useEffect } from "react";
import axios from "axios";
import baseUrl from "../api/baseApi";

const OlaMapComponent = () => {
  useEffect(() => {
    if (!window.OlaMapsSDK) {
      console.error(
        "Ola Maps SDK is not loaded. Make sure the SDK script is included."
      );
      return;
    }

    const olaMaps = new window.OlaMapsSDK.OlaMaps({
      apiKey: "KR068kAzKDRS5bE9YDEAQL0iqj62gXblHw9oniBH",
    });

    const myMap = olaMaps.init({
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: "map",
      center: { lat: 26.4499, lng: 80.3319 },
      zoom: 12,
    });

    //Naviagation Buttons
    const navigationControls = olaMaps.addNavigationControls({
      showCompass: true,
      showZoom: true,
      visualizePitch: true,
    });

    myMap.addControl(navigationControls);

    //Events
    myMap.on("load", () => {
      console.log("Loaded0101");
    });

    // Add a marker with popup
    const addMarkerWithPopup = (lat, lng, title) => {
      const popup = olaMaps
        .addPopup({ offset: [0, -30], anchor: "bottom" })
        .setHTML(`<div>${title}</div>`);

      olaMaps
        .addMarker({
          offset: [0, 6],
          anchor: "bottom",
          color: "pink",
          draggable: false,
        })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(myMap);
    };

    // Fetch data and add markers to the map
    axios
      .get(`${baseUrl}/api/map?location=Malls%20in%20Kanpur`)
      .then((response) => {
        const predictions = response.data.predictions;
        console.log(predictions);

        predictions.forEach((loc) => {
          const { lat, lng } = loc.geometry.location;
          const { name } = loc;

          addMarkerWithPopup(lat, lng, name);
        });
      })
      .catch((error) => console.error("Error fetching map data:", error));
  }, []);

  return (
    <div>
      <div id="map" style={{ height: "600px", width: "100%" }}></div>
    </div>
  );
};

export default OlaMapComponent;
