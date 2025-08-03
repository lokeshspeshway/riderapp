import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import api from '../services/api';

export default function DriverVehicleRegister() {
  const [form, setForm] = useState({
    driverId: '',
    type: 'compact',
    model: '',
    year: '',
    seats: '',
    trunkSize: '',
    licenseNumber: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    if (image) formData.append('image', image);

    await api.post('/vehicles/register', formData);
    alert('Vehicle Registered');
    setForm({
      driverId: '',
      type: 'compact',
      model: '',
      year: '',
      seats: '',
      trunkSize: '',
      licenseNumber: '',
    });
    setImage(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register Driver Vehicle
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Driver ID"
            name="driverId"
            value={form.driverId}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Model"
            name="model"
            value={form.model}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Year"
            name="year"
            value={form.year}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Seats"
            name="seats"
            value={form.seats}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Trunk Size"
            name="trunkSize"
            value={form.trunkSize}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="License Number"
            name="licenseNumber"
            value={form.licenseNumber}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Vehicle Type</InputLabel>
            <Select
              name="type"
              value={form.type}
              onChange={handleChange}
              label="Vehicle Type"
            >
              <MenuItem value="compact">Compact</MenuItem>
              <MenuItem value="XL">XL</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2 }}
            fullWidth
          >
            Upload Vehicle Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          {image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {image.name}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Register Vehicle
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
