import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        background: '#0e0e12',
        borderTop: '1px solid #222',
        py: 3,
        textAlign: 'center',
        position: 'relative',
        left: 0,
        bottom: 0,
        zIndex: 1001,
        color: '#fff'
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Link to="/admin" style={{ textDecoration: 'none', marginRight: 12 }}>
          <Button
            variant="outlined"
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              borderColor: '#444',
              background: 'rgba(255,255,255,0.04)',
              color: '#fff',
              px: 3,
              py: 1.2,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                background: '#19191f',
                borderColor: '#fff'
              }
            }}
          >
            Admin
          </Button>
        </Link>
        <Link to="/admin/reservations" style={{ textDecoration: 'none', marginLeft: 12 }}>
          <Button
            variant="outlined"
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              borderColor: '#444',
              background: 'rgba(255,255,255,0.04)',
              color: '#fff',
              px: 3,
              py: 1.2,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                background: '#19191f',
                borderColor: '#fff'
              }
            }}
          >
            Reservations CMS
          </Button>
        </Link>
      </Box>
      <Typography variant="body2" sx={{ color: '#aaa', fontSize: 15 }}>
        © {new Date().getFullYear()}  This is a personal non-commercial project.
      </Typography>
    </Box>
  );
}