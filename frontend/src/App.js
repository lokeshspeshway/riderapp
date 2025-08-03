import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import DriverVehicleRegister from './pages/DriverVehicleRegister';
import BookRide from './pages/BookRide';
import LiveTracking from './pages/LiveTracking';
import LocationUpdater from './pages/LocationUpdater';
import ViewInvoices from './pages/ViewInvoices';
import PayRide from './pages/PayRide';
import AdminDashboard from './pages/AdminDashboard';
import UploadDocs from './pages/UploadDocs';
import VerifyDocs from './pages/VerifyDocs';
import ExportReports from './pages/ExportReports';
import ClockPage from './pages/ClockPage';
import LeavePage from './pages/LeavePage';
import PayslipPage from './pages/PayslipPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/driver/register-vehicle" element={<DriverVehicleRegister />} />
        <Route path="/book-ride" element={<BookRide />} />
        <Route path="/track/:userId" element={<LiveTracking userId="2" />} />
        <Route path="/update-location" element={<LocationUpdater userId="2" />} />
        <Route path="/invoices/:userId" element={<ViewInvoices userId="2" />} />
        <Route path="/pay" element={<PayRide />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/upload-docs" element={<UploadDocs />} />
        <Route path="/verify-docs" element={<VerifyDocs />} />
        <Route path="/admin/reports" element={<ExportReports />} />
        <Route path="/employee/clock" element={<ClockPage />} />
        <Route path="/employee/leave" element={<LeavePage />} />
        
        <Route path="/employee/payslip" element={<PayslipPage />} />
      </Routes>
    </BrowserRouter>
  );
}
//hi
export default App;
