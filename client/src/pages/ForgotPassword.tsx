import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import { Logo } from '../components';

const ForgotPassword = () => {
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
            error={true}
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoFocus
            className='customTextField'
            helperText={true ? 'Incorrect username or password' : ''}
          />
          <span className='mt-2 ml-1'>{`hello`}</span>
          {/* <p className='text-xl text-center my-5'>Reset Password Success !</p> */}
          {/* <p className='text-xl text-center my-5'>
            We've sent an email to {'@email'} to verify your email address and
            activate your account. The link in the email will expire in 24
            hours.{' '}
          </p> */}
          <Button
            type='submit'
            fullWidth
            size='large'
            variant='contained'
            sx={{ mt: 3, mb: 2, py: 2 }}
            className='font-dynaPuff bg-grey-dark rounded-xl hover:bg-grey-darkHover text-lg'
          >
            Verify your email
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
