import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ViewInvoices({ userId }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.get(`/invoices/${userId}`).then(res => {
      setInvoices(res.data);
    });
  }, [userId]);

  return (
    <div>
      <h3>My Ride Invoices</h3>
      {invoices.map((tx, i) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <p>Ride ID: {tx.rideId}</p>
          <p>Fare: ₹{tx.totalFare.toFixed(2)}</p>
          <p>Breakdown:</p>
          <ul>
            <li>Base: ₹{tx.baseFare}</li>
            <li>Distance: ₹{tx.distanceFare}</li>
            <li>Time: ₹{tx.timeFare}</li>
            <li>Surge x{tx.surge}</li>
            <li>Tax: ₹{tx.tax.toFixed(2)}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
