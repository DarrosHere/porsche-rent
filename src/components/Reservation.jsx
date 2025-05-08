import React from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function Reservation({ car, reservation }) {
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2,
        background: '#f5f6fa',
        borderRadius: 2,
        py: 1.5,
        px: 1.5,
        color: '#111'
      }}
    >
      <Avatar
        variant="rounded"
        src={car?.images?.[0] || undefined}
        alt={car?.name || 'Car'}
        sx={{
          width: 80,
          height: 54,
          bgcolor: '#fff',
          border: '1px solid #ddd',
          mr: 2,
          fontSize: 24,
          objectFit: 'contain'
        }}
        imgProps={{
            style: { objectFit: 'contain', width: '100%', height: '100%' }
          }}
      >
        {!car?.images?.[0] && (car?.name ? car.name[0] : '?')}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111' }}>
          {car ? car.name : reservation.carId}
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#111' }}>
          {reservation.date} &nbsp;|&nbsp; {reservation.days} days
        </Typography>
      </Box>
    </ListItem>
  );
}