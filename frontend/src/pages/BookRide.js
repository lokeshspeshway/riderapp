
import React, { useState } from 'react';
import api from '../services/api'; // your axios or fetch setup

export default function BookRide() {
  const [form, setForm] = useState({
    riderId: '',
    pickupLocation: '',
    dropLocation: '',
    vehicleType: 'compact',
  });

  const [rideInfo, setRideInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBook = async () => {
    setError(null);

    if (!form.riderId || !form.pickupLocation || !form.dropLocation) {
      setError('Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form, riderId: parseInt(form.riderId, 10) };
      const res = await api.post('/rides/book', payload);
      setRideInfo(res.data.ride);
      // Optional: Reset form fields
      // setForm({ riderId: '', pickupLocation: '', dropLocation: '', vehicleType: 'compact' });
    } catch (err) {
      setError('Failed to book ride. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Book a Ride</h2>

      <input
        name="riderId"
        placeholder="Rider ID"
        value={form.riderId}
        onChange={handleChange}
      />
      <input
        name="pickupLocation"
        placeholder="Pickup"
        value={form.pickupLocation}
        onChange={handleChange}
      />
      <input
        name="dropLocation"
        placeholder="Drop"
        value={form.dropLocation}
        onChange={handleChange}
      />
      <select name="vehicleType" value={form.vehicleType} onChange={handleChange}>
        <option value="compact">Compact</option>
        <option value="XL">XL</option>
        <option value="premium">Premium</option>
      </select>

      <button onClick={handleBook} disabled={loading}>
        {loading ? 'Booking...' : 'Book Ride'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {rideInfo && (
        <div>
          <h4>Ride Confirmed</h4>
          <p>Driver: {rideInfo.driverId}</p>
          <p>Pickup Location: {rideInfo.pickupLocation}</p>
          <p>Drop Location: {rideInfo.dropLocation}</p>
          <p>Fare: ₹{rideInfo.fare}</p>
          <p>Status: {rideInfo.status}</p>
        </div>
      )}
    </div>
  );
}
