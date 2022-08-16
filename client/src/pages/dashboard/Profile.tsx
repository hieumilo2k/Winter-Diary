import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress,
} from '@mui/material';
import {
  isEmpty,
  isMatch,
  isPassword,
} from '../../utils/validation/Validation';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import userApi from '../../api/userApi';
import { userActions } from '../../app/features/user/userSlice';

const initialState = {
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  err: '',
  success: '',
};

const Profile = () => {
  const [editUser, setEditUser] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useAppSelector((state: AppState) => state.user);
  const dispatch = useAppDispatch();

  const { firstName, lastName, password, confirmPassword, err, success } =
    editUser;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value, err: '', success: '' });
  };

  const changeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const file = e.target.files;
      if (file) {
        const image = file[0];
        if (image.size > 2 * 1024 * 1024)
          return setEditUser({
            ...editUser,
            err: 'Size too large.',
            success: '',
          });
        if (!image.type.match(/\/(jpg|jpeg|png|gif)$/))
          return setEditUser({
            ...editUser,
            err: 'File format is incorrect.',
            success: '',
          });
        let formData = new FormData();
        formData.append('avatar', image);
        setLoading(true);
        await userApi.uploadAvatar(formData);
        dispatch(userActions.getUserStart());
        setLoading(false);
      } else {
        return setEditUser({
          ...editUser,
          err: 'No files uploaded !',
          success: '',
        });
      }
    } catch (error) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)) {
      return setEditUser({
        ...editUser,
        err: 'Please fill in all fields.',
        success: '',
      });
    }

    if (!isPassword(password)) {
      return setEditUser({
        ...editUser,
        err: 'Invalid Password.',
        success: '',
      });
    }

    if (!isMatch(password, confirmPassword)) {
      return setEditUser({
        ...editUser,
        err: 'Password did not match.',
        success: '',
      });
    }

    try {
      // const { data } = await authApi.signUp({
      //   firstName,
      //   lastName,
      //   password,
      // });
      // setEditUser({ ...editUser, err: '', success: data.msg });
    } catch (error) {
      const err = error as AxiosError;
      const data: any = err.response?.data;
      data?.message &&
        setEditUser({ ...editUser, err: data?.message, success: '' });
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
        <Typography
          component='h1'
          variant='h2'
          className='font-oleo-script'
          onClick={() => navigate('/')}
        >
          Winter Diary
        </Typography>
        <div className='relative my-0 mx-auto w-[150px] h-[150px]'>
          <Avatar
            sx={{ m: 1, width: 120, height: 120 }}
            className='bg-white-F1'
            src={user.avatar}
          />
          <input
            hidden
            type='file'
            name='avatar'
            id='avatar-upload'
            onChange={changeAvatar}
          />
          {loading ? (
            <CircularProgress className='absolute bottom-[45%] right-[45%]' />
          ) : (
            <>
              <label htmlFor='avatar-upload' hidden={false}>
                <PhotoCameraIcon className='absolute bottom-4 right-9 text-grey-default cursor-pointer z-50 hover:text-grey-dark' />
              </label>
            </>
          )}
        </div>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            id='firstName'
            label='First Name'
            name='firstName'
            value={user.firstName}
            onChange={handleChangeInput}
            className='customTextField mr-5 w-[47%]'
          />
          <TextField
            margin='normal'
            required
            id='lastName'
            label='Last Name'
            name='lastName'
            value={user.lastName}
            onChange={handleChangeInput}
            className='customTextField w-[48%]'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            name='email'
            value={user.email}
            disabled
            className='customTextField'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            name='username'
            value={user.username}
            disabled
            className='customTextField'
          />
          <Tooltip title='*Your password must be at least 5 characters including a lowercase letter, an uppercase letter, and a number'>
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
              <strong>{editUser.err}</strong>
            </Alert>
          )}
          {success && (
            <Alert severity='success'>
              <strong>{editUser.success}</strong>
            </Alert>
          )}
          <Button
            type='submit'
            fullWidth
            size='large'
            variant='contained'
            sx={{ mt: 3, mb: 2, py: 2 }}
            className='font-dynaPuff bg-grey-dark rounded-xl hover:bg-grey-darkHover text-lg disabled:text-white-F1cc'
            onClick={handleSubmit}
            disabled
          >
            Update Profile
          </Button>
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

export default Profile;
