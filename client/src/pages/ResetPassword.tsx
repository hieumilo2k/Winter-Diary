import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import { Logo } from '../components';
import { isMatch, isPassword } from '../utils/validation/Validation';
import authApi from '../api/authApi';
import { AxiosError } from 'axios';

const initialState = {
  password: '',
  confirmPassword: '',
  err: '',
  success: '',
};

const ResetPassword = () => {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, confirmPassword, err, success } = data;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: '', success: '' });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPassword(password)) {
      return setData({
        ...data,
        err: 'Invalid Password.',
        success: '',
      });
    }

    if (!isMatch(password, confirmPassword)) {
      return setData({
        ...data,
        err: 'Password did not match.',
        success: '',
      });
    }

    try {
      if (token) {
        const { data } = await authApi.resetPassword(token, password);
        setData({
          password: '',
          confirmPassword: '',
          err: '',
          success: data.msg,
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    } catch (error) {
      const err = error as AxiosError;
      const res: any = err.response?.data;
      res?.message &&
        setData({
          password: '',
          confirmPassword: '',
          err: res.message,
          success: '',
        });
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      className='bg-white-F1 p-5 rounded-3xl min-h-[90vh] my-8 max-w-lg font-Cabin-Regular shadow-inner shadow-grey-dark'
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
          Reset Password
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            onChange={handleChangeInput}
            autoComplete='current-password'
            className='customTextField'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={handleChangeInput}
            className='customTextField'
          />
          <div className='mt-1'>
            {err && (
              <Alert severity='error'>
                <strong>{data.err}</strong>
              </Alert>
            )}
            {success && (
              <Alert severity='success'>
                <strong>{data.success}</strong>
              </Alert>
            )}
          </div>
          <Button
            type='submit'
            fullWidth
            size='large'
            variant='contained'
            sx={{ mt: 3, mb: 2, py: 2 }}
            className='font-dynaPuff bg-grey-dark rounded-xl hover:bg-grey-darkHover text-lg'
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
