import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Slider } from '@mui/material';
import parsePrice from '../utils/parsePrice';
import CarCard from './CarCard';

function CarList({ cars }) {
  const navigate = useNavigate();
  const prices = cars.map(car => parsePrice(car.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const handlePriceChange = (e, newValue) => setPriceRange(newValue);

  const filteredCars = cars.filter(car => {
    const price = parsePrice(car.price);
    return price >= priceRange[0] && price <= priceRange[1];
  });

  return (
    <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh', py: 6, width: '100vw' }}>
      <Container maxWidth={false} sx={{ px: { xs: 1, md: 8 }, width: '100vw' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "#111" }}>
          All Models
        </Typography>
        <Box sx={{ mb: 4, maxWidth: 400 }}>
          <Typography sx={{ color: "#111", fontWeight: 600, mb: 1 }}>Filter by price</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            min={minPrice}
            max={maxPrice}
            step={1000}
            valueLabelDisplay="auto"
            sx={{
              color: "#111",
              '& .MuiSlider-thumb': { borderRadius: 1, border: '2px solid #111' },
              '& .MuiSlider-rail': { opacity: 0.3 },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', color: "#111", fontWeight: 500 }}>
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </Box>
        </Box>
        <Grid container spacing={4}>
          {filteredCars.length === 0 && (
            <Grid item xs={12}>
              <Typography color="#888" sx={{ textAlign: 'center', mt: 4 }}>No cars in this price range.</Typography>
            </Grid>
          )}
          {filteredCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <CarCard car={car} onSelect={id => navigate(`/car/${id}`)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default CarList;