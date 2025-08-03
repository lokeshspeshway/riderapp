import React, { useState } from 'react';
import api from '../services/api';

export default function UploadDocs() {
  const [userId] = useState('2');
  const [type, setType] = useState('DL');
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('type', type);
    formData.append('file', file);

    await api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert('Document uploaded');
  };

  return (
    <div>
      <h3>Upload Document</h3>
      <select onChange={e => setType(e.target.value)}>
        <option value="DL">Driving License</option>
        <option value="Aadhar">Aadhar</option>
        <option value="PAN">PAN</option>
        <option value="RC">Vehicle RC</option>
      </select>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
