import React from 'react';
import Reservation from './Reservation';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function NotificationList({ reservations, cars }) {
  return (
    <Paper
      elevation={6}
      sx={{
        position: 'fixed',
        top: 60,
        right: 20,
        zIndex: 1100,
        minWidth: 340,
        maxWidth: 400,
        maxHeight: 500,
        overflowY: 'auto',
        p: 2,
        color: '#111'
      }}
    >
      <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 2 }}>
        Reservations:
      </Typography>
      <List sx={{ p: 0 }}>
        {reservations.length === 0 && (
          <ListItem sx={{ color: '#888' }}>No reservations yet.</ListItem>
        )}
        {reservations.map((r, i) => {
          const car = cars.find(c => String(c.id) === String(r.carId));
          return (
            <ListItem key={i} disableGutters sx={{ p: 0, mb: 1 }}>
              <Reservation car={car} reservation={r} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}