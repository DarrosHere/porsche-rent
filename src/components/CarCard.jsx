import React from 'react';
import { Paper, Box, Chip, CardMedia, Typography, Button } from '@mui/material';

export default function CarCard({ car, onSelect }) {
  return (
    <Paper
      elevation={0}
      onClick={() => onSelect(car.id)}
      sx={{
        borderRadius: 4,
        p: { xs: 3, md: 4 },
        bgcolor: "#fff",
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
        border: "none",
        minHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        position: "relative",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "pointer",
        maxWidth: 375,
        '&:hover': {
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)",
          transform: "translateY(-8px) scale(1.02)"
        }
      }}
    >
      <Box sx={{ position: "absolute", top: 24, left: 24, zIndex: 2 }}>
        <Chip
          label={car.fuel}
          size="small"
          sx={{
            bgcolor: "#f5f6fa",
            color: "#222",
            fontWeight: 600,
            fontSize: 13,
            height: 28,
            borderRadius: 2,
            px: 1.5,
            boxShadow: "none"
          }}
        />
      </Box>
      <CardMedia
        component="img"
        height="180"
        image={car.images[0]}
        alt={car.name}
        sx={{
          objectFit: 'contain',
          mb: 2,
          mt: 4,
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: "none"
        }}
      />
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#111", mb: 0.5, mt: 1, fontSize: 28 }}>
        {car.name}
      </Typography>
      <Typography sx={{ color: "#888", fontWeight: 500, mb: 2, fontSize: 15 }}>
        From <span style={{ color: "#111" }}>{car.price}</span>
        <span style={{ fontWeight: 400, fontSize: 16, color: "#888" }}> / day</span>
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#111", mb: 0, fontSize: 22 }}>
          {car.acceleration}
        </Typography>
        <Typography sx={{ color: "#888", fontSize: 15, mb: 1 }}>0 - 60 mph</Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#111", mb: 0, fontSize: 22 }}>
          {car.power} 
        </Typography>
        <Typography sx={{ color: "#888", fontSize: 15, mb: 1 }}>Max. engine power</Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#111", mb: 0, fontSize: 22 }}>
          {car.speed}
        </Typography>
        <Typography sx={{ color: "#888", fontSize: 15 }}>
          Top track speed (with summer tires)
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "auto" }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            bgcolor: "#111",
            color: "#fff",
            fontSize: 18,
            boxShadow: "none",
            py: 1.5,
            px: 5
          }}
          onClick={e => {
            e.stopPropagation();
            onSelect(car.id);
          }}
        >
          Select model
        </Button>
      </Box>
    </Paper>
  );
}