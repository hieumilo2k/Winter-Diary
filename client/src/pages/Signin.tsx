import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { Logo } from '../components';
import authApi from '../api/authApi';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../app/hooks';
import { authActions } from '../app/features/auth/authSlice';

const initialState = {
  username: '',
  password: '',
  err: '',
  success: '',
};

const SignIn = () => {
  const [user, setUser] = useState(initialState);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();

  const { username, password, err, success } = user;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { msg } = await authApi.signIn({
        username: username.toLowerCase(),
        password,
      });

      if (rememberMe) {
        localStorage.setItem('firstLogin', 'true');
      } else {
        localStorage.removeItem('firstLogin');
        sessionStorage.setItem('firstLogin', 'true');
      }
      dispatch(authActions.loginStart(msg));
      setUser({ ...user, err: '', success: msg });
    } catch (error) {
      const err = error as AxiosError;
      const data: any = err.response?.data;
      data?.message && setUser({ ...user, err: data?.message, success: '' });
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
          Sign in
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoFocus
            value={username}
            onChange={handleChangeInput}
            className='customTextField'
          />
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
          <FormControlLabel
            control={
              <Checkbox
                value='remember'
                color='primary'
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            }
            label='Remember me'
          />
          <div className='mt-1'>
            {err && (
              <Alert severity='error'>
                <strong>{user.err}</strong>
              </Alert>
            )}
            {success && (
              <Alert severity='success'>
                <strong>{user.success}</strong>
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
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container className='mt-8'>
            <Grid item xs>
              <Link
                to='/forgotPassword'
                className='text-base font-semibold hover:text-grey-darkHover'
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              Don't have an account ? {''}
              <Link
                to='/sign-up'
                className='text-base font-semibold hover:text-grey-darkHover'
              >
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
