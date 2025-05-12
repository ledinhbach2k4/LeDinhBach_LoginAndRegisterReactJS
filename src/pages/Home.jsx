import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import { Typography, Grid, Chip, Box, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Home = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('/db_analys.json')
      .then(res => res.json())
      .then(data => setTours(data.tours));
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f5f5f5' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          color: '#1a237e', 
          textAlign: 'center', 
          mb: 4 
        }}
      >
        Danh Sách Tour Quốc Tế
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {tours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={tour.id}>
            <Card 
              sx={{ 
                width: 300, 
                height: 480, 
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
                image={`https://picsum.photos/seed/picsum/400/200`}
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
              <Box sx={{ px: 2, pb: 2, height: 50 }}>
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
                    height: '100%'
                  }}
                >
                  Xem Chi Tiết
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;