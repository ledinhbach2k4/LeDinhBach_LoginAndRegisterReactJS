import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ my: 4 }}>Đăng nhập</Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
          password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc'),
        })}
        onSubmit={(values) => {
          console.log(values);
          navigate('/');
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <TextField
              fullWidth margin="normal" label="Email" name="email"
              value={values.email} onChange={handleChange}
              error={Boolean(errors.email && touched.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth margin="normal" type="password" label="Mật khẩu" name="password"
              value={values.password} onChange={handleChange}
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
