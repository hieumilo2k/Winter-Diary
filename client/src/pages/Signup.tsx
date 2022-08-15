import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Logo } from '../components';

const SignUp = () => {
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
            error={true}
            margin='normal'
            required
            id='firstName'
            label='First Name'
            name='firstName'
            autoFocus
            className='customTextField mr-5 w-[47%]'
            helperText={true ? 'Incorrect username or password' : ''}
          />
          <TextField
            error={true}
            margin='normal'
            required
            id='lastName'
            label='Last Name'
            name='lastName'
            className='customTextField w-[48%]'
            helperText={true ? 'Incorrect username or password' : ''}
          />
          <TextField
            error={true}
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            className='customTextField'
            helperText={true ? 'Incorrect username or password' : ''}
          />
          <TextField
            error={true}
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            className='customTextField'
            helperText={true ? 'Incorrect username or password' : ''}
          />
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
          <TextField
            error={true}
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
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
