import React from 'react';

export default function PayslipPage() {
  const handleDownload = () => {
    window.open('http://localhost:5000/api/reports/users/pdf');
  };

  return (
    <div>
      <h3>Download Payslip</h3>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
}
