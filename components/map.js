// components/Map.jsx

import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Next.js Link

mapboxgl.accessToken = 'pk.eyJ1IjoibWFzb25hcmRpdGkiLCJhIjoiY20zNnprM2c5MGI3aDJrcHNwcTlqc2tkYiJ9._ZXBwh8zhsRKp1hn1_b75A';

// Define the PopupContent component
const PopupContent = ({ pin }) => {
  const { theme } = useTheme();

  return (
    <div>
      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-black' : 'text-orange-600'}`}>
        <a href={pin.url} target="_blank" rel="noopener noreferrer">
          {pin.name}
        </a>
      </h3>
      <Link href={pin.route}>
        <Button variant="default" size="sm" className="mt-2">
          View Museum
        </Button>
      </Link>
    </div>
  );
};

const Map = () => {
  const { theme } = useTheme();
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
//   const [coordinates, setCoordinates] = useState({ lng: null, lat: null });
//   const [locationName, setLocationName] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const presetPins = [
    {
      lat: 34.046614660503515,
      lng: -118.56503246136992,
      name: 'Getty Villa',
      url: 'https://www.getty.edu/visit/villa/',
      route: '/Getty',
    },
    {
      lat: 48.8606111,
      lng: 2.337644,
      name: 'Louvre Museum',
      url: 'https://www.louvre.fr/en',
      route: '/Louvre',
    },
    {
      lat: 39.904211,
      lng: 116.401394,
      name: 'National Museum of China',
      url: 'http://en.chnmuseum.cn/',
      route: '/Beijing',
    },
  ];

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: 'mapContainer',
      style: theme === "dark"
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11',
      center: [-118.56503246136992, 34.046614660503515],
      zoom: 12,
      attributionControl: false,
    });

    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(newMap);

    const ORANGE_COLOR = '#ff6700';

    presetPins.forEach(pin => {
      const popupNode = document.createElement('div');
      const popupRoot = ReactDOM.createRoot(popupNode);
      popupRoot.render(<PopupContent pin={pin} />);

      const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupNode);

      new mapboxgl.Marker({ color: ORANGE_COLOR })
        .setLngLat([pin.lng, pin.lat])
        .setPopup(popup)
        .addTo(newMap);
    });

    return () => {
      newMap.remove();
    };
  }, [theme]);

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
    // setCoordinates({ lng, lat });
    // setLocationName(suggestion.place_name);
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
        // setCoordinates({ lng, lat });
        // setLocationName(data.features[0].place_name);

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
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        ></div>
      </CardContent>
    </Card>
  );
};

export default Map;
