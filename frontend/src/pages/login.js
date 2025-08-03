import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import api from '../services/api';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('rider');

  const handleSendOTP = async () => {
    if (!phone) return alert('Please enter phone number');
    await api.post('/auth/send-otp', { phone });
    setStep(2);
  };

  const handleVerifyOTP = async () => {
    if (!code) return alert('Please enter OTP');
    const res = await api.post('/auth/verify-otp', { phone, code, role });
    localStorage.setItem('token', res.data.token);
    alert(`Logged in as ${res.data.user.role}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {step === 1 ? 'Login with Phone' : 'Enter OTP'}
        </Typography>

        {step === 1 ? (
          <>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem value="rider">Rider</MenuItem>
                <MenuItem value="driver">Driver</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleSendOTP}
              sx={{ mt: 2 }}
            >
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="OTP"
              variant="outlined"
              fullWidth
              margin="normal"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleVerifyOTP}
              sx={{ mt: 2 }}
            >
              Verify & Login
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}
