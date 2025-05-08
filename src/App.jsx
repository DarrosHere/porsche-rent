import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import AdminAddCar from './components/AdminAddCar';
import NotificationList from './components/NotificationList';
import Footer from './components/Footer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AdminReservations from './components/AdminReservations';

function App() {
  const [cars, setCars] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('aws link')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false); 
      })
      .catch(() => {
        setCars([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (showNotifications) {
      const my = JSON.parse(localStorage.getItem('my_reservations') || '[]');
      setReservations(my);
    }
  }, [showNotifications]);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>; 

  return (
    <Router>
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          display: 'flex',
          gap: 2
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setShowNotifications(s => !s)}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            borderColor: '#bbb',
            background: '#fff',
            color: '#111',
            px: 2.5,
            py: 1.2,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              background: '#f5f6fa',
              borderColor: '#888'
            }
          }}
        >
          Notifications
        </Button>
      </Box>
      {showNotifications && (
        <NotificationList reservations={reservations} cars={cars} />
      )}

<Routes>
  <Route path="/" element={<CarList cars={cars} />} />
  <Route path="/car/:id" element={<CarDetail cars={cars} />} />
  <Route path="/admin" element={<AdminAddCar />} />
  <Route path="/admin/reservations" element={<AdminReservations cars={cars} />} />
</Routes>

      <Footer />
    </Router>
  );
}

export default App;