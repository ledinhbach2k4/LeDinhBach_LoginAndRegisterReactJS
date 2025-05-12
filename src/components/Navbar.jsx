// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tour Booking
        </Typography>
        <Button color="inherit" component={Link} to="/">Trang chủ</Button>
        <Button color="inherit" component={Link} to="/login">Đăng nhập</Button>
        <Button color="inherit" component={Link} to="/register">Đăng ký</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
