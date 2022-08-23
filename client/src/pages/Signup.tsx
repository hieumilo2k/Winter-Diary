import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  isEmail,
  isEmpty,
  isPassword,
  isMatch,
} from '../utils/validation/Validation';
import { Logo } from '../components';
import { AxiosError } from 'axios';
import authApi from '../api/authApi';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  err: '',
  success: '',
};

const SignUp = () => {
  const [user, setUser] = useState(initialState);

  const {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    err,
    success,
  } = user;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(email) ||
      isEmpty(username) ||
      isEmpty(password)
    ) {
      return setUser({
        ...user,
        err: 'Please fill in all fields.',
        success: '',
      });
    }

    if (!isEmail(email)) {
      return setUser({ ...user, err: 'Invalid Email.', success: '' });
    }

    if (!isPassword(password)) {
      return setUser({ ...user, err: 'Invalid Password.', success: '' });
    }

    if (!isMatch(password, confirmPassword)) {
      return setUser({ ...user, err: 'Password did not match.', success: '' });
    }

    try {
      const { data } = await authApi.signUp({
        firstName,
        lastName,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password,
      });
      setUser({ ...user, err: '', success: data.msg });
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
          Sign up
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            id='firstName'
            label='First Name'
            name='firstName'
            value={firstName}
            onChange={handleChangeInput}
            autoFocus
            className='customTextField mr-5 w-[47%]'
          />
          <TextField
            margin='normal'
            required
            id='lastName'
            label='Last Name'
            name='lastName'
            value={lastName}
            onChange={handleChangeInput}
            className='customTextField w-[48%]'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            value={email}
            onChange={handleChangeInput}
            autoComplete='email'
            className='customTextField'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            value={username}
            onChange={handleChangeInput}
            className='customTextField'
          />
          <Tooltip title='*Your password must be at least 5 characters including a lowercase letter, an uppercase letter, a number and a special character'>
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
          </Tooltip>
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
          <Button
            type='submit'
            fullWidth
            size='large'
            variant='contained'
            sx={{ mt: 3, mb: 2, py: 2 }}
            className='font-dynaPuff bg-grey-dark rounded-xl hover:bg-grey-darkHover text-lg'
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container className='mt-8 flex justify-center'>
            <Grid item>
              Already have an account ? {''}
              <Link
                to='/sign-in'
                className='text-base font-semibold hover:text-grey-darkHover'
              >
                Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
