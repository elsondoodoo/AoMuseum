// components/Map.jsx

import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoibWFzb25hcmRpdGkiLCJhIjoiY20zNnprM2c5MGI3aDJrcHNwcTlqc2tkYiJ9._ZXBwh8zhsRKp1hn1_b75A';

const Map = () => {
  const { theme } = useTheme();
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coordinates, setCoordinates] = useState({ lng: null, lat: null });
  const [locationName, setLocationName] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Preset pins are static and do not change
  const presetPins = [
    {
      lat: 34.046614660503515, 
      lng: -118.56503246136992,
      name: 'Getty Villa',
    },
    // Add more preset pins here if needed
  ];

  useEffect(() => {
    // Initialize the map
    const newMap = new mapboxgl.Map({
      container: 'mapContainer',
      style: theme === "dark" 
        ? 'mapbox://styles/mapbox/dark-v11' 
        : 'mapbox://styles/mapbox/light-v11', // Use theme to set the initial style
      center: [-122.4194, 37.7749], // Initial center [lng, lat]
      zoom: 10,
      attributionControl: false,
    });

    // Add navigation controls
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(newMap);

    const ORANGE_COLOR = '#ff6700'; // Define your specific orange color

    // Add preset pins
    presetPins.forEach(pin => {
      new mapboxgl.Marker({ color: ORANGE_COLOR }) // Use the defined orange color
        .setLngLat([pin.lng, pin.lat])
        .setPopup(new mapboxgl.Popup().setText(pin.name))
        .addTo(newMap);
    });

    // Cleanup on unmount
    return () => {
      newMap.remove();
    };
  }, [theme]); // Reinitialize map when theme changes

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        if (data.features) {
          setSuggestions(data.features);
        }
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const [lng, lat] = suggestion.center;
    setCoordinates({ lng, lat });
    setLocationName(suggestion.place_name);
    setSearchQuery(suggestion.place_name);
    setSuggestions([]);

    map.flyTo({ center: [lng, lat], zoom: 12 });
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setCoordinates({ lng, lat });
        setLocationName(data.features[0].place_name);

        map.flyTo({ center: [lng, lat], zoom: 12 });
      } else {
        console.error("No results found for the search query.");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Map</CardTitle>
        <CardDescription>Search for any museum your heart desires.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', gap: '5px' }}>
          <input
            type="text"
            placeholder="Enter a location"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleSearch}
            className="border rounded px-2 py-1 transition-colors duration-200 hover:text-[#ff6700]"
          >
            Search
          </button>
        </div>
        <div>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.place_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          id="mapContainer"
          style={{
            width: '100%',
            height: '400px',
            marginTop: '10px',
            borderRadius: '10px', // Adjust the radius as needed
            overflow: 'hidden', // Ensures the map respects the rounded corners
          }}
        ></div>
      </CardContent>
    </Card>
  );
};

export default Map;
