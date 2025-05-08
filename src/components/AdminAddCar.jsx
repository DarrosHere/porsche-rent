import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

export default function AdminAddCar() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    images: ['', '', ''],
    description: '',
    acceleration: '',
    power: '',
    speed: '',
    fuel: '',
    specs: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith('image')) {
      const idx = Number(name.replace('image', ''));
      setForm(f => ({
        ...f,
        images: f.images.map((img, i) => (i === idx ? value : img))
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const apiUrl = 'aws link';

    let specsObj = null;
    if (form.specs.trim()) {
      try {
        specsObj = JSON.parse(form.specs);
      } catch {
        alert('Specs must be valid JSON!');
        return;
      }
    }

    const carData = { ...form, specs: specsObj };

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData)
    });
    if (res.ok) {
      alert('Car added!');
      setForm({
        id: '', name: '', price: '', images: ['', '', ''],
        description: '', acceleration: '', power: '', speed: '', fuel: '', specs: ''
      });
    } else {
      alert('Error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh', 
        minWidth: '100vw',
        bgcolor: '#0e0e12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m: 0,
        p: 0,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          maxWidth: 500,
          width: '100%',
          bgcolor: '#18181e',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)'
        }}
      >
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3, textAlign: 'center', letterSpacing: '-0.02em' }}>
          Add New Porsche
        </Typography>
        <Box component="form" onSubmit={handleSubmit} autoComplete="off">
          <TextField
            name="id"
            value={form.id}
            onChange={handleChange}
            label="ID"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="name"
            value={form.name}
            onChange={handleChange}
            label="Name"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="price"
            value={form.price}
            onChange={handleChange}
            label="Price"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="image0"
            value={form.images[0]}
            onChange={handleChange}
            label="Image 1 URL"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="image1"
            value={form.images[1]}
            onChange={handleChange}
            label="Image 2 URL"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="image2"
            value={form.images[2]}
            onChange={handleChange}
            label="Image 3 URL"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="description"
            value={form.description}
            onChange={handleChange}
            label="Description"
            required
            fullWidth
            sx={{ mb: 2 }}
            multiline
            minRows={2}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="acceleration"
            value={form.acceleration}
            onChange={handleChange}
            label="Acceleration"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="power"
            value={form.power}
            onChange={handleChange}
            label="Power"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="speed"
            value={form.speed}
            onChange={handleChange}
            label="Speed"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="fuel"
            value={form.fuel}
            onChange={handleChange}
            label="Fuel"
            required
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />
          <TextField
            name="specs"
            value={form.specs}
            onChange={handleChange}
            label="Specs (JSON)"
            fullWidth
            multiline
            minRows={5}
            sx={{ mb: 3 }}
            InputProps={{ sx: { borderRadius: 2, bgcolor: '#23232a', color: '#fff', fontFamily: 'monospace' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
            placeholder='{"image":"...","dimensions":[...],"motor":[...],"performance":[...]}'
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 2,
              bgcolor: '#111',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              py: 1.5,
              boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
              textTransform: 'none',
              letterSpacing: '-0.02em',
              '&:hover': {
                bgcolor: '#222',
                transform: 'scale(1.03)'
              }
            }}
          >

            Add Car 


          </Button>
        </Box>
      </Paper>
    </Box>
  );
}