import React from 'react';

export default function ExportReports() {
  const download = (url, name) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000${url}`;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <h3>Export Reports</h3>
      <button onClick={() => download('/api/reports/rides/csv', 'rides.csv')}>Download Rides CSV</button>
      <button onClick={() => download('/api/reports/transactions/csv', 'transactions.csv')}>Download Transactions CSV</button>
      <button onClick={() => download('/api/reports/users/pdf', 'users.pdf')}>Download Users PDF</button>
    </div>
  );
}
