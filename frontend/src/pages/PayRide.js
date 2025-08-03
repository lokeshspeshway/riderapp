import React, { useState } from 'react';
import api from '../services/api';

export default function PayRide() {
  const [userId] = useState('2');
  const [rideId] = useState('1');
  const [amount] = useState(199);

  const handlePayment = async () => {
    const res = await api.post('/payments/order', { amount, userId });
    const { order } = res.data;

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',
      amount: order.amount,
      currency: order.currency,
      name: 'Ride Booking',
      description: 'Ride Fare Payment',
      order_id: order.id,
      handler: async (response) => {
        await api.post('/payments/success', { userId, rideId, amount });
        alert('Payment Successful');
      },
      prefill: {
        name: 'Loki',
        email: 'loki@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#0f0'
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div>
      <h3>Pay ₹{amount} for Ride #{rideId}</h3>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
