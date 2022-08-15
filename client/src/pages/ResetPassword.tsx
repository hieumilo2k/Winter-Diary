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

const ResetPassword = () => {
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
            error={true}
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            className='customTextField'
            helperText={true ? 'Incorrect username or password' : ''}
          />
          <TextField
            error={true}
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            type='confirmPassword'
            id='confirmPassword'
            className='customTextField'
            helperText={true ? 'Incorrect username or password' : ''}
          />
          <span className='mt-2 ml-1'>{`hello`}</span>
          <Button
            type='submit'
            fullWidth
            size='large'
            variant='contained'
            sx={{ mt: 3, mb: 2, py: 2 }}
            className='font-dynaPuff bg-grey-dark rounded-xl hover:bg-grey-darkHover text-lg'
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
