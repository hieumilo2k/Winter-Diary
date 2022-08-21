import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Grid,
  Pagination,
  Stack,
  Typography,
  Modal,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { Logo } from '../../components';
import { diaries, itemsPerPage, SplitArray } from '../../utils/SplitArray';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DeleteIcon from '@mui/icons-material/Delete';
import DiaryItems from './DiaryItems';
import diaryApi from '../../api/diaryApi';
import { userActions } from '../../app/features/user/userSlice';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const AllDiaries = () => {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [diaryId, setDiaryId] = useState('');

  const { user } = useAppSelector((state: AppState) => state.user);
  const pages = Math.ceil(user.diaries.length / itemsPerPage);
  const diaryArray = SplitArray(user.diaries, pages) || [];
  const dispatch = useAppDispatch();

  const compare3days = (date: string) => {
    const today = new Date();
    const dayCreated = new Date(date);
    if (today.getMonth() > dayCreated.getMonth()) return true;
    else if (today.getMonth() === dayCreated.getMonth()) {
      if (today.getDate() - dayCreated.getDate() > 2) return true;
      else return false;
    }
  };

  const handleOpen = (id: string) => {
    if (id) {
      setDiaryId(id);
      return setOpen(true);
    }
  };

  const handleClose = () => {
    setDiaryId('');
    return setOpen(false);
  };

  const handleDelete = (docId: string) => {
    try {
      diaryApi.deleteDocument(docId);
      dispatch(userActions.getUserStart());
    } catch (error) {
      console.log(error);
    }
  };

  const handlePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  return (
    <>
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
            height: '100%',
            position: 'relative',
          }}
        >
          <Avatar
            sx={{ m: 1, width: 120, height: 120 }}
            className='bg-white-F1'
          >
            <Link to='/'>
              <Logo />
            </Link>
          </Avatar>
          <Typography component='h1' variant='h2' className='font-oleo-script'>
            List Diaries
          </Typography>
          <Box component='div' sx={{ mt: 1, minWidth: '90%' }}>
            <ButtonGroup
              disableElevation
              orientation='vertical'
              aria-label='vertical contained button group'
              variant='contained'
              fullWidth
              size='large'
              sx={{ mt: 3 }}
            >
              {diaryArray[page] ? (
                diaryArray[page].map((diary: diaries, index) => {
                  return (
                    <div className='relative' key={index}>
                      <Button
                        key={diary._id}
                        className='mb-5 p-6 rounded-2xl bg-grey-darkLight hover:bg-grey-darkHover font-dynaPuff'
                        onClick={() => handleOpen(diary._id)}
                      >
                        <div>
                          <AutoStoriesIcon className='mr-5' />
                          {moment(diary.createdAt).format(
                            'dddd, MMMM DD, YYYY'
                          )}
                        </div>
                      </Button>
                      <div
                        className='absolute top-6 right-5'
                        hidden={compare3days(diary.createdAt)}
                      >
                        <DeleteIcon
                          className='ml-2 z-50 text-white-F1 hover:text-red-neon hover:cursor-pointer'
                          onClick={() => handleDelete(diary._id)}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className='flex flex-col items-center mt-8 pointer-events-none'>
                    <CatchingPokemonIcon className='text-6xl text-red-dark' />
                    <h1 className='text-lg text-grey-default font-Roboto-Slab'>
                      No Items
                    </h1>
                  </div>
                </>
              )}
            </ButtonGroup>
          </Box>
          <div className='absolute bottom-0'>
            {diaryArray.length > 1 && (
              <Stack spacing={2}>
                <Pagination
                  count={pages}
                  showFirstButton
                  showLastButton
                  onChange={handlePage}
                  className='pagination-custom'
                />
              </Stack>
            )}

            <Grid container className='mt-6 flex justify-center'>
              <Grid item>
                © {new Date().getFullYear()} Winter Diary,{' '}
                <span className='text-base font-semibold'>NTHMiLo</span>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          <DiaryItems docId={diaryId} />
        </>
      </Modal>
    </>
  );
};

export default AllDiaries;
