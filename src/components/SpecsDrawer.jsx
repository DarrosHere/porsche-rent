import React from 'react';
import { Drawer, Box, IconButton, Typography, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function SpecsDrawer({ open, onClose, car }) {
  if (!car?.specs) return null;
  const { specs } = car;
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: 500 },
          maxWidth: '100vw',
          bgcolor: "#fff",
          p: 0,
          boxShadow: 8,
        }
      }}
      ModalProps={{
        keepMounted: true,
        BackdropProps: { sx: { backgroundColor: 'transparent' } }
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 4 }, position: 'relative', minHeight: '100vh' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            bgcolor: "#f5f6fa",
            '&:hover': { bgcolor: "#eee" }
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="subtitle2" sx={{ color: "#888", mb: 0.5 }}>
          {car.name}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Technical Specs
        </Typography>
        <Box sx={{
          bgcolor: "#f5f6fa",
          borderRadius: 3,
          p: 3,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <img
            src={specs.image}
            alt="car top"
            style={{ width: '100%', maxWidth: 340, marginBottom: 16 }}
          />
          {Array.isArray(specs.dimensions) && specs.dimensions.length > 0 && (
            <Grid container spacing={2} sx={{ width: '100%', maxWidth: 340 }}>
              {specs.dimensions.map((d, i) => (
                <Grid item xs={6} key={i}>
                  <Typography sx={{ color: "#888", fontSize: 15 }}>{d.label}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{d.value}</Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Motor</Typography>
        <Box component="table" sx={{ width: '100%', mb: 4 }}>
          <tbody>
            {Array.isArray(specs.motor) && specs.motor.map((item, i) => (
              <tr key={i}>
                <td style={{ color: '#888', fontSize: 15, padding: '4px 0', width: '60%' }}>{item.label}</td>
                <td style={{ fontWeight: 500, fontSize: 15, padding: '4px 0', textAlign: 'right' }}>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Performance</Typography>
        <Box component="table" sx={{ width: '100%', mb: 2 }}>
          <tbody>
            {Array.isArray(specs.performance) && specs.performance.map((item, i) => (
              <tr key={i}>
                <td style={{ color: '#888', fontSize: 15, padding: '4px 0', width: '70%' }}>{item.label}</td>
                <td style={{ fontWeight: 500, fontSize: 15, padding: '4px 0', textAlign: 'right' }}>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </Box>
      
      </Box>
    </Drawer>
  );
}

export default SpecsDrawer;