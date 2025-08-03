import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get('/admin/stats').then(res => setStats(res.data));
    api.get('/admin/users').then(res => setUsers(res.data));
    api.get('/admin/rides').then(res => setRides(res.data));
    api.get('/admin/transactions').then(res => setTransactions(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h4>📊 Stats:</h4>
      <p>Total Users: {stats.userCount}</p>
      <p>Total Rides: {stats.rideCount}</p>
      <p>Total Revenue: ₹{stats.totalRevenue}</p>
      <p>Active Drivers: {stats.activeDrivers}</p>

      <h4>👥 Users:</h4>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.role} - {u.phone}</li>
        ))}
      </ul>

      <h4>🚕 Rides:</h4>
      <ul>
        {rides.map(r => (
          <li key={r.id}>#{r.id} - ₹{r.fare} ({r.status})</li>
        ))}
      </ul>

      <h4>💳 Transactions:</h4>
      <ul>
        {transactions.map(t => (
          <li key={t.id}>User {t.userId} - ₹{t.totalFare} - {t.status}</li>
        ))}
      </ul>
    </div>
  );
}
