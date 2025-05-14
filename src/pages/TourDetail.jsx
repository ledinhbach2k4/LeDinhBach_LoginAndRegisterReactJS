import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Chip, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { fetchTour } from '../redux/slices/tourSlice';
import { addBooking } from '../redux/slices/bookingSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const TourDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tour = useSelector((state) => state.tours.selectedTour);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.tours.loading);

  useEffect(() => {
    dispatch(fetchTour(id));
  }, [dispatch, id]);

  const handleBookTour = () => {
    if (!isAuthenticated) {
      toast.warn('Vui lòng đăng nhập để đặt tour');
      navigate('/login');
      return;
    }
    const booking = {
      tourId: id,
      userId: user?.user_id,
      bookingDate: new Date().toISOString(),
      status: 'Pending',
    };
    dispatch(addBooking(booking));
    axios.post('http://localhost:3001/bookings', booking)
      .then(() => toast.success('Đặt tour thành công!'))
      .catch(() => toast.error('Lỗi khi đặt tour'));
  };

  if (loading) return <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>;
  if (!tour) return <Typography>Không tìm thấy tour</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
        {tour.title}
      </Typography>
      <img 
        src={tour.image_url || 'https://picsum.photos/seed/picsum/800/400'} 
        alt={tour.title} 
        style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }} 
      />
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d32f2f', mb: 2 }}>
        Giá: {tour.price} {tour.original_price && (
          <Typography component="span" color="text.disabled" sx={{ textDecoration: 'line-through', ml: 1 }}>
            {tour.original_price}
          </Typography>
        )}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>Thời gian: {tour.duration}</Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>Khởi hành: {tour.departure_date}</Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>Nhà cung cấp: {tour.provider}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <StarIcon color="warning" fontSize="small" />
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {tour.rating} ({tour.reviews} đánh giá)
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ mb: 1 }}>Điểm nổi bật:</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {tour.highlights.map((hl, i) => (
          <Chip key={i} label={hl} color="primary" variant="outlined" />
        ))}
      </Box>
      {tour.promotion && (
        <Chip 
          label={tour.promotion} 
          color="secondary" 
          sx={{ mb: 2, backgroundColor: '#f06292', color: '#fff' }} 
        />
      )}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleBookTour}
        sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}
      >
        Đặt Tour
      </Button>
    </Box>
  );
};

export default TourDetail;