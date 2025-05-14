import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, TextField, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { Typography, Grid, Chip, Box, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { setTours, filterTours } from '../redux/slices/tourSlice';
import { addBooking } from '../redux/slices/bookingSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tours = useSelector((state) => state.tours.filteredTours);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/tours')
      .then(res => {
        dispatch(setTours(res.data));
        setLoading(false);
      })
      .catch(err => {
        toast.error('Lỗi khi tải danh sách tour');
        setLoading(false);
      });
  }, [dispatch]);

  const handleFilter = () => {
    dispatch(filterTours({ search, category, priceRange }));
  };

  const handleBookTour = (tourId) => {
    if (!isAuthenticated) {
      toast.warn('Vui lòng đăng nhập để đặt tour');
      navigate('/login');
      return;
    }
    const booking = {
      tourId,
      userId: user?.user_id,
      bookingDate: new Date().toISOString(),
      status: 'Pending',
    };
    dispatch(addBooking(booking));
    axios.post('http://localhost:3001/bookings', booking)
      .then(() => toast.success('Đặt tour thành công!'))
      .catch(() => toast.error('Lỗi khi đặt tour'));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f5f5f5' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: '#1a237e', textAlign: 'center', mb: 4 }}
      >
        Danh Sách Tour Quốc Tế
      </Typography>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Tìm kiếm tour"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: '100%', sm: 200 } }}
        />
        <FormControl sx={{ width: { xs: '100%', sm: 200 } }}>
          <InputLabel>Danh mục</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="International">Quốc tế</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: { xs: '100%', sm: 200 } }}>
          <InputLabel>Giá</InputLabel>
          <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="0-10">Dưới 10 triệu</MenuItem>
            <MenuItem value="10-20">10-20 triệu</MenuItem>
            <MenuItem value="20+">Trên 20 triệu</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleFilter}>Lọc</Button>
      </Box>
      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {tours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tour.id}>
              <Card 
                sx={{ 
                  width: 300, 
                  height: 520, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={tour.image_url || 'https://picsum.photos/seed/picsum/400/200'}
                  alt={tour.title}
                  sx={{ objectFit: 'cover', width: '100%' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2, height: 270, overflow: 'hidden' }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      lineHeight: '1.3', 
                      minHeight: '60px', 
                      maxHeight: '60px', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {tour.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 1, height: 20, overflow: 'hidden' }}
                  >
                    ⏱ {tour.duration} | 🗓 {tour.departure_date}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ fontWeight: 'bold', color: '#d32f2f', mb: 1, height: 24, overflow: 'hidden' }}
                  >
                    💰 {tour.price}{' '}
                    {tour.original_price && (
                      <Typography 
                        component="span" 
                        color="text.disabled" 
                        sx={{ textDecoration: 'line-through', fontSize: '0.9rem', ml: 1 }}
                      >
                        {tour.original_price}
                      </Typography>
                    )}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, height: 20, overflow: 'hidden' }}>
                    <StarIcon color="warning" fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {tour.rating} ({tour.reviews} đánh giá)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', height: 60, overflow: 'hidden' }}>
                    {tour.highlights.map((hl, i) => (
                      <Chip 
                        key={i} 
                        label={hl} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ borderRadius: '4px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      />
                    ))}
                  </Box>
                  {tour.promotion && (
                    <Chip 
                      label={tour.promotion} 
                      color="secondary" 
                      size="small"
                      sx={{ mt: 1, backgroundColor: '#f06292', color: '#fff', height: 24, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    />
                  )}
                </CardContent>
                <Box sx={{ px: 2, pb: 2, height: 90 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    href={tour.link}
                    sx={{ 
                      borderRadius: '8px', 
                      textTransform: 'none', 
                      fontWeight: 'bold',
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#1565c0' },
                      mb: 1
                    }}
                  >
                    Xem Chi Tiết
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleBookTour(tour.id)}
                    sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Đặt Tour
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;