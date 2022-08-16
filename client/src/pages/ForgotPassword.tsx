import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import { Logo } from '../components';
import { isEmail } from '../utils/validation/Validation';
import authApi from '../api/authApi';
import { AxiosError } from 'axios';

const initialState = {
  email: '',
  err: '',
  success: '',
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);
  const { email, err, success } = data;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: '', success: '' });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email))
      return setData({ ...data, err: 'Invalid email.', success: '' });
    try {
      const res = await authApi.forgotPassword(email);
      return setData({ ...data, err: '', success: res.data.msg });
    } catch (error) {
      const err = error as AxiosError;
      const res: any = err.response?.data;
      res?.message && setData({ ...data, err: res.message, success: '' });
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      className='bg-white-F1 p-5 rounded-3xl min-h-[70vh] my-8 max-w-lg font-Cabin-Regular shadow-inner shadow-grey-dark'
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, width: 120, height: 120 }} className='bg-white-F1'>
          <Link to='/'>
            <Logo />
          </Link>
        </Avatar>
        <Typography component='h1' variant='h2' className='font-oleo-script'>
          Forgot Password
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            value={email}
            onChange={handleChangeInput}
            autoFocus
            className='customTextField'
          />
          {success && (
            <Alert severity='success' className='my-5'>
              <AlertTitle>
                <strong className='text-base text-center'>{success}</strong>
              </AlertTitle>
            </Alert>
          )}
          {err && (
            <Alert severity='error' className='my-5'>
              <AlertTitle>
                <strong className='text-base text-center'>{err}</strong>
              </AlertTitle>
            </Alert>
          )}
          <Button
            type='submit'
            fullWidth
            size='large'
            variant='contained'
            sx={{ mt: 3, mb: 2, py: 2 }}
            className='font-dynaPuff bg-grey-dark rounded-xl hover:bg-grey-darkHover text-lg'
            onClick={handleForgotPassword}
          >
            Verify your email
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
