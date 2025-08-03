import React from 'react';
import api from '../services/api';

export default function ClockPage() {
  const userId = '2';

  const handleClock = async (type) => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const location = `${pos.coords.latitude},${pos.coords.longitude}`;
      await api.post('/employee/clock', { userId, type, location });
      alert(`${type} recorded`);
    });
  };

  return (
    <div>
      <h3>Clock-In/Out</h3>
      <button onClick={() => handleClock('clock_in')}>Clock In</button>
      <button onClick={() => handleClock('clock_out')}>Clock Out</button>
      <button onClick={() => handleClock('break_start')}>Break Start</button>
      <button onClick={() => handleClock('break_end')}>Break End</button>
    </div>
  );
}
