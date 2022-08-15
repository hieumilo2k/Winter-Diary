import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material';
import { Logo } from '../components';
import authApi from '../api/authApi';
import { AxiosError } from 'axios';

const ActivationEmail = () => {
  const { activationToken } = useParams();
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          const res = await authApi.activationEmail(activationToken);
          setErr('');
          setSuccess(res.data.msg);
        } catch (error) {
          const err = error as AxiosError;
          const data: any = err.response?.data;
          setSuccess('');
          data?.message && setErr(data?.message);
        }
      };
      activationEmail();
    }
  }, [activationToken]);

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
          Activation Email
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          {success && (
            <Alert severity='success' className='my-5'>
              <AlertTitle>
                <strong className='text-xl text-center'>{success}</strong>
              </AlertTitle>
            </Alert>
          )}
          {err && (
            <Alert severity='error' className='my-5'>
              <AlertTitle>
                <strong className='text-xl text-center'>{err}</strong>
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
            onClick={() => navigate('/')}
          >
            Winter Diary
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ActivationEmail;
