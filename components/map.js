import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

mapboxgl.accessToken = 'pk.eyJ1IjoibWFzb25hcmRpdGkiLCJhIjoiY20zNnprM2c5MGI3aDJrcHNwcTlqc2tkYiJ9._ZXBwh8zhsRKp1hn1_b75A';

const Map = () => {
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coordinates, setCoordinates] = useState({ lng: null, lat: null });
  const [locationName, setLocationName] = useState('');
  const [pins, setPins] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [markers, setMarkers] = useState([]);

  const presetPins = [];

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-122.4194, 37.7749],
      zoom: 10,
      attributionControl: false,
    });

    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(newMap);

    presetPins.forEach(pin => {
      const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([pin.lng, pin.lat])
        .setPopup(new mapboxgl.Popup().setText(pin.name))
        .addTo(newMap);
    });

    return () => newMap.remove();
  }, []);

  useEffect(() => {
    const savedPins = JSON.parse(localStorage.getItem('pins')) || [];
    setPins(savedPins);

    if (map) {
      savedPins.forEach(pin => {
        if (typeof pin.lng === 'number' && typeof pin.lat === 'number') {
          const marker = new mapboxgl.Marker()
            .setLngLat([pin.lng, pin.lat])
            .addTo(map);
          setMarkers(prevMarkers => [...prevMarkers, marker]);
        } else {
          console.error("Invalid pin data:", pin);
        }
      });
    }
  }, [map]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`);
      const data = await response.json();
      if (data.features) {
        setSuggestions(data.features);
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
  };

  const handleAddPin = () => {
    const coordinates = map.getCenter();
    const newPin = {
      lng: coordinates.lng,
      lat: coordinates.lat,
      name: locationName,
    };

    setPins((prevPins) => {
      const updatedPins = [...prevPins, newPin];
      localStorage.setItem('pins', JSON.stringify(updatedPins));
      return updatedPins;
    });

    const marker = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map);
    setMarkers(prevMarkers => [...prevMarkers, marker]);
  };

  const handleClearPins = () => {
    setPins([]);
    localStorage.removeItem('pins');

    markers.forEach(marker => marker.remove());
    setMarkers([]);

    presetPins.forEach(pin => {
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([pin.lng, pin.lat])
        .setPopup(new mapboxgl.Popup().setText(pin.name))
        .addTo(map);
    });
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
          <button onClick={handleSearch} className="border rounded px-2 py-1">
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
        <div id="mapContainer" style={{ width: '100%', height: '400px' }}></div>
      </CardContent>
      {/* we can add in pins later 
      <CardFooter>
        <button onClick={handleAddPin} className="border rounded px-2 py-1">Add Pin</button>
        <button onClick={handleClearPins} className="border rounded px-2 py-1">Clear Pins</button>
      </CardFooter> */}
    </Card>
  );
};



export default Map;
