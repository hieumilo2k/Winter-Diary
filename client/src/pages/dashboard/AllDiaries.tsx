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
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components';

const AllDiaries = () => {
  return (
    <Container
      component='main'
      maxWidth='xs'
      className='bg-white-F1 p-5 rounded-3xl h-[90vh] my-8 max-w-2xl font-Cabin-Regular shadow-inner shadow-grey-dark'
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
          List Diaries
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          {/* <div className='mt-1'>
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
           </div> */}
          <Grid container className='mt-8 flex justify-center'>
            <Grid item>
              © {new Date().getFullYear()} Winter Diary,{' '}
              <span className='text-base font-semibold'>NTHMiLo</span>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AllDiaries;
