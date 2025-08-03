import React, { useState } from 'react';
import api from '../services/api';

export default function BookRide() {
  const [form, setForm] = useState({
    riderId: '',
    pickupLocation: '',
    dropLocation: '',
    vehicleType: 'compact'
  });

  const [rideInfo, setRideInfo] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBook = async () => {
    const res = await api.post('/rides/book', form);
    setRideInfo(res.data.ride);
  };

  return (
    <div>
      <h2>Book a Ride</h2>
      <input name="riderId" placeholder="Rider ID" onChange={handleChange} />
      <input name="pickupLocation" placeholder="Pickup" onChange={handleChange} />
      <input name="dropLocation" placeholder="Drop" onChange={handleChange} />
      <select name="vehicleType" onChange={handleChange}>
        <option value="compact">Compact</option>
        <option value="XL">XL</option>
        <option value="premium">Premium</option>
      </select>
      <button onClick={handleBook}>Book Ride</button>

      {rideInfo && (
        <div>
          <h4>Ride Confirmed</h4>
          <p>Driver: {rideInfo.driverId}</p>
          <p>Fare: ₹{rideInfo.fare}</p>
          <p>Status: {rideInfo.status}</p>
        </div>
      )}
    </div>
  );
}
