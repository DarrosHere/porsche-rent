import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar
} from '@mui/material';

export default function AdminReservations({ cars }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('aws link')
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setReservations(data) : setReservations([]))
      .catch(() => setReservations([]));
  }, []);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 6 },
        width: '100vw',
        minHeight: '100vh',
        bgcolor: '#f5f6fa',
        mx: 0
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          mb: 4,
          color: "#111",
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          fontFamily: 'Porsche Next, Arial, sans-serif'
        }}
      >
        Reservations
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)',
          background: '#fff',
          width: '100vw',
          minWidth: 0,
          overflowX: 'auto'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#fafbfc' }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 18, color: '#111', py: 2 }}>Car</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 18, color: '#111', py: 2 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 18, color: '#111', py: 2 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 18, color: '#111', py: 2 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 18, color: '#111', py: 2 }}>Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!Array.isArray(reservations) || reservations.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: '#888', py: 4, fontSize: 20 }}>
                  No reservations yet.
                </TableCell>
              </TableRow>
            )}
            {Array.isArray(reservations) && reservations.map((r, i) => {
              const car = cars.find(c => String(c.id) === String(r.carId));
              return (
                <TableRow
                  key={i}
                  sx={{
                    '&:hover': { background: '#f0f1f3' },
                    transition: 'background 0.2s'
                  }}
                >
                  <TableCell sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                  variant="rounded"
                src={car?.images?.[0] || undefined}
                alt={car?.name || 'Car'}
                sx={{
                  width: 72,
                  height: 48,
                  bgcolor: '#fff',
                  border: '1.5px solid #bbb',
                  mr: 2,
                  overflow: 'hidden', 
                }}
                imgProps={{
                  style: { objectFit: 'contain', width: '100%', height: '100%' } 
                }}
              >
                {!car?.images?.[0] && (car?.name ? car.name[0] : '?')}
              </Avatar>
                 <Typography sx={{ color: '#111', fontWeight: 700, fontSize: 18 }}>
                        {car ? car.name : r.carId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: 16, color: '#222', fontWeight: 500 }}>{r.name}</TableCell>
                  <TableCell sx={{ fontSize: 16, color: '#222', fontWeight: 500 }}>{r.phone}</TableCell>
                  <TableCell sx={{ fontSize: 16, color: '#222', fontWeight: 500 }}>{r.date}</TableCell>
                  <TableCell sx={{ fontSize: 16, color: '#222', fontWeight: 500 }}>{r.days}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}