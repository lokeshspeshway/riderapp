import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import api from '../services/api';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

export default function LiveTracking({ userId }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(78.4867);
  const [lat, setLat] = useState(17.3850);

  // Fetch user's latest location
  const fetchLocation = async () => {
    const res = await api.get(`/locations/${userId}`);
    if (res.data) {
      setLat(res.data.lat);
      setLng(res.data.lng);
    }
  };

  useEffect(() => {
    fetchLocation();
    const interval = setInterval(fetchLocation, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 14
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
  }, [lng, lat]);

  return (
    <div>
      <h3>Live Ride Tracking</h3>
      <div ref={mapContainer} style={{ height: '400px', width: '100%' }} />
    </div>
  );
}
