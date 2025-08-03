import React, { useEffect } from 'react';
import api from '../services/api';

export default function LocationUpdater({ userId }) {
  useEffect(() => {
    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        await api.post('/locations/update', {
          userId,
          role: 'driver',
          lat: latitude,
          lng: longitude
        });
      });
    };

    sendLocation(); // initial send
    const interval = setInterval(sendLocation, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  return <p>Updating location in background...</p>;
}
