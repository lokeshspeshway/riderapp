import React, { useState } from 'react';
import api from '../services/api';

export default function LeavePage() {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const userId = '2';

  const submitLeave = async () => {
    await api.post('/employee/leave', { userId, date, reason });
    alert('Leave requested');
  };

  return (
    <div>
      <h3>Leave Request</h3>
      <input type="date" onChange={e => setDate(e.target.value)} />
      <input placeholder="Reason" onChange={e => setReason(e.target.value)} />
      <button onClick={submitLeave}>Submit</button>
    </div>
  );
}
