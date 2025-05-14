import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tour Booking
        </Typography>
        <Button color="inherit" component={Link} to="/">Trang chủ</Button>
        {isAuthenticated ? (
          <Button color="inherit" onClick={() => dispatch(logout())}>Đăng xuất</Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Đăng nhập</Button>
            <Button color="inherit" component={Link} to="/register">Đăng ký</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;