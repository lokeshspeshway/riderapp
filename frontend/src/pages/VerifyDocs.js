import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function VerifyDocs() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    api.get('/documents/all').then(res => setDocs(res.data));
  }, []);

  const handleStatus = async (id, status) => {
    await api.put(`/documents/${id}/status`, { status });
    alert('Updated');
  };

  return (
    <div>
      <h3>Verify Driver Documents</h3>
      {docs.map(doc => (
        <div key={doc.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <p>User: {doc.userId}</p>
          <p>Type: {doc.type}</p>
          <p>Status: {doc.status}</p>
          <img src={`http://localhost:5000/uploads/${doc.filePath}`} alt="doc" height="100" />
          <div>
            <button onClick={() => handleStatus(doc.id, 'approved')}>Approve</button>
            <button onClick={() => handleStatus(doc.id, 'rejected')}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
