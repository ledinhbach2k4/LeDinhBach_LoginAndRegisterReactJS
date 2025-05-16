import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Typography variant="h4" align="center" sx={{ my: 4 }}>Đăng nhập</Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
          password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc'),
        })}
        onSubmit={async (values) => {
          try {
            const res = await axios.get(`http://localhost:3001/users?email=${values.email}`);
            const user = res.data[0];

            if (!user) {
              toast.error('Email không tồn tại');
              return;
            }

            const isMatch = bcrypt.compareSync(values.password, user.password);
            if (!isMatch) {
              toast.error('Sai mật khẩu');
              return;
            }

            dispatch(login(user));
            toast.success('Đăng nhập thành công!');
            navigate('/');
          } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            toast.error('Đăng nhập thất bại!');
          }
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={Boolean(errors.email && touched.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Mật khẩu"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={Boolean(errors.password && touched.password)}
              helperText={touched.password && errors.password}
            />
            <Box sx={{ mt: 2 }}>
              <Button fullWidth type="submit" variant="contained">Đăng nhập</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
