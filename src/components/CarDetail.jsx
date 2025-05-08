import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Grid, CardMedia, Button, Chip,
  Dialog, TextField, Slide
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckIcon from '@mui/icons-material/Check';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import SpecsDrawer from './SpecsDrawer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CarDetail({ cars }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => String(c.id) === String(id));
  const [open, setOpen] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    days: '',
  });
  const [success, setSuccess] = useState(false);

  if (!car) return <Typography color="#111">Car not found</Typography>;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
  };

  const handleSpecsOpen = () => setSpecsOpen(true);
  const handleSpecsClose = () => setSpecsOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'aws link';
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: car.id,
          name: form.name,
          phone: form.phone,
          date: form.date,
          days: form.days
        })
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', phone: '', date: '', days: '' });

        const reservation = {
          carId: car.id,
          name: form.name,
          phone: form.phone,
          date: form.date,
          days: form.days
        };
        const prev = JSON.parse(localStorage.getItem('my_reservations') || '[]');
        localStorage.setItem('my_reservations', JSON.stringify([...prev, reservation]));

        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed ');
    }
  };

  const blurStyle = specsOpen ? { filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none' } : {};
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;
  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 31);
  const maxyyyy = maxDateObj.getFullYear();
  const maxmm = String(maxDateObj.getMonth() + 1).padStart(2, '0');
  const maxdd = String(maxDateObj.getDate()).padStart(2, '0');
  const maxDate = `${maxyyyy}-${maxmm}-${maxdd}`;

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", width: "100vw", px: 0, py: 0, position: "relative" }}>
      <Box sx={{ position: 'relative', zIndex: specsOpen ? 1 : 'auto' }}>
        <Box sx={{ position: "fixed", top: 32, left: 32, zIndex: 10 }}>
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => navigate('/')}
            sx={{
              bgcolor: "#fff",
              color: "#111",
              borderRadius: 2,
              border: "1px solid #ddd",
              fontWeight: 600,
              px: 2,
              py: 1,
              boxShadow: "none",
              textTransform: "none",
              '&:hover': { bgcolor: "#f5f6fa", borderColor: "#bbb" }
            }}
          >
            Back
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            bgcolor: "#fafbfc",
            pt: 6,
            pb: 2,
            display: "flex",
            justifyContent: "center",
            position: "relative",
            ...blurStyle
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 0, md: -30 },
              left: 0,
              width: '100%',
              textAlign: 'center',
              zIndex: 3,
              fontSize: { xs: 100, md: 220 },
              fontWeight: 700,
              color: '#000',
              opacity: 0.07,
              pointerEvents: 'none',
              userSelect: 'none',
              lineHeight: 1,
              letterSpacing: '-0.05em',
            }}
          >
            {car.name.match(/\d+/)?.[0] || ''}
          </Box>
          <CardMedia
            component="img"
            image={car.images[0]}
            alt={car.name}
            sx={{
              objectFit: "contain",
              width: { xs: "98vw", md: "1200px" },
              height: { xs: 220, md: 420 },
              bgcolor: "#fafbfc",
              borderRadius: 2,
              zIndex: 2,
              position: 'relative'
            }}
          />
        </Box>
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 2, ...blurStyle }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: "#111" }}>
            {car.name}
          </Typography>
          <Chip label={car.fuel} size="small" sx={{ mb: 1 }} />
          <Typography sx={{ fontSize: 22, mb: 1, color: "#111" }}>
            Price per day: <span style={{ fontWeight: 700 }}>{car.price}</span>
          </Typography>
          <Typography sx={{ color: "#888", fontSize: 14, mb: 2 }}>
            All prices include insurance and taxes
          </Typography>
          <Typography sx={{ color: "#444", fontSize: 17, mb: 2 }}>
            {car.description}
          </Typography>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, ...blurStyle }}>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: "center", md: "right" } }}>
              <Typography variant="h3" sx={{ fontWeight: 400, color: "#111" }}>{car.acceleration}</Typography>
              <Typography sx={{ color: "#888", mb: 2 }}>0 - 60 mph</Typography>
              <Typography variant="h3" sx={{ fontWeight: 400, color: "#111" }}>{car.power}</Typography>
              <Typography sx={{ color: "#888", mb: 2 }}>Max. engine power</Typography>
              <Typography variant="h3" sx={{ fontWeight: 400, color: "#111" }}>{car.speed}</Typography>
              <Typography sx={{ color: "#888", mb: 2 }}>Top track speed</Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: "center", md: "flex-end" }, mt: 3 }}>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    px: 3,
                    py: 1.5,
                    color: "#111",
                    borderColor: "#111",
                    borderWidth: 2,
                    textTransform: "none",
                    fontSize: 18,
                    '&:hover': { borderColor: "#111", background: "#f5f5f5" }
                  }}
                  size="large"
                  onClick={handleOpen}
                >
                  Rent
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    px: 3,
                    py: 1.5,
                    color: "#111",
                    borderColor: "#111",
                    borderWidth: 2,
                    textTransform: "none",
                    fontSize: 18,
                    '&:hover': { borderColor: "#111", background: "#f5f5f5" }
                  }}
                  size="large"
                  onClick={handleSpecsOpen}
                >
                  Specs
                </Button>
              </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                  sx: {
                    borderRadius: 4,
                    p: 0,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                    minWidth: { xs: 320, sm: 400 }
                  }
                }}
              >
                <Box sx={{ bgcolor: '#111', color: '#fff', py: 3, px: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <DirectionsCarFilledIcon sx={{ fontSize: 36, color: '#fff' }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                    Rent {car.name}
                  </Typography>
                </Box>
                {!success ? (
                  <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, pt: 3 }}>
                    <TextField
                      label="Your Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      fullWidth
                      sx={{ mb: 3 }}
                      InputProps={{
                        sx: { borderRadius: 2, fontSize: 18, bgcolor: '#fafbfc' }
                      }}
                    />
                    <TextField
                      label="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      fullWidth
                      sx={{ mb: 3 }}
                      placeholder="+1 (___) ___-____"
                      inputProps={{
                        maxLength: 11
                      }}
                      InputProps={{
                        sx: { borderRadius: 2, fontSize: 18, bgcolor: '#fafbfc' }
                      }}
                    />
                    <TextField
                      label="Start Date"
                      name="date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={form.date}
                      onChange={handleChange}
                      required
                      fullWidth
                      sx={{ mb: 3 }}
                      inputProps={{
                        min: minDate,
                        max: maxDate
                      }}
                      InputProps={{
                        sx: { borderRadius: 2, fontSize: 18, bgcolor: '#fafbfc' }
                      }}
                    />
                    <TextField
                      label="Days"
                      name="days"
                      type="number"
                      inputProps={{ min: 1, max: 31 }}
                      value={form.days}
                      onChange={handleChange}
                      required
                      fullWidth
                      sx={{ mb: 4 }}
                      InputProps={{
                        sx: { borderRadius: 2, fontSize: 18, bgcolor: '#fafbfc' }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                      <Button
                        onClick={handleClose}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 1.2,
                          fontWeight: 600,
                          color: '#111',
                          bgcolor: '#f5f6fa',
                          border: '1.5px solid #bbb',
                          textTransform: 'none',
                          '&:hover': { bgcolor: '#eee', borderColor: '#888' }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 1.2,
                          fontWeight: 700,
                          fontSize: 18,
                          bgcolor: '#111',
                          color: '#fff',
                          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
                          textTransform: 'none',
                          transition: 'transform 0.15s',
                          '&:hover': {
                            bgcolor: '#222',
                            transform: 'scale(1.04)'
                          }
                        }}
                      >
                        Send request
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ p: 6, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#111', mb: 2 }}>
                      Your request has been sent!
                    </Typography>
                    <Typography sx={{ color: '#444', fontSize: 18 }}>
                      Our manager will contact you as soon as possible
                    </Typography>
                  </Box>
                )}
              </Dialog>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                image={car.images[1] || car.images[0]}
                alt={car.name}
                sx={{
                  objectFit: "contain",
                  width: { xs: "90vw", md: "500px" },
                  height: { xs: "180px", md: "320px" },
                  bgcolor: "#fafbfc",
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 8, ...blurStyle }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#111" }}>
            Rental conditions
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
              display: "inline-block",
              textAlign: "left",
              fontSize: 17,
              color: "#222",
              mb: 3,
              minWidth: 320,
            }}
          >
            <Box component="li" sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <CheckIcon sx={{ color: "#00874B", mr: 1 }} />
              Choose your dates and fill in your contact details
            </Box>
            <Box component="li" sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <CheckIcon sx={{ color: "#00874B", mr: 1 }} />
              Our manager will contact you to confirm the booking
            </Box>
            <Box component="li" sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <CheckIcon sx={{ color: "#00874B", mr: 1 }} />
              Pick up your car at our office or request delivery
            </Box>
            <Box component="li" sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <CheckIcon sx={{ color: "#00874B", mr: 1 }} />
              All prices include insurance and taxes
            </Box>
            <Box component="li" sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <CheckIcon sx={{ color: "#00874B", mr: 1 }} />
              Minimum age: 21 years. Valid driver’s license required
            </Box>
          </Box>
        </Container>
      </Box>
      <SpecsDrawer open={specsOpen} onClose={handleSpecsClose} car={car} />
      {specsOpen && (
        <Box
          onClick={handleSpecsClose}
          sx={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            bgcolor: 'rgba(0,0,0,0.12)',
            zIndex: 1200,
            backdropFilter: 'blur(6px)'
          }}
        />
      )}
    </Box>
  );
}

export default CarDetail;