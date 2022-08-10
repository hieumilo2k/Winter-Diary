import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface TogglePersonProps {
  openPerson: boolean;
  setOpenPerson: (openPerson: boolean) => void;
  anchorEl: null | HTMLElement;
  id: string | undefined;
}

const TogglePerson: React.FC<TogglePersonProps> = ({
  openPerson,
  anchorEl,
  id,
  setOpenPerson,
}) => {
  const handleClickAway = () => {
    setOpenPerson(false);
  };

  return (
    <div>
      <Popper id={id} open={openPerson} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={350}>
              <Box
                sx={{
                  border: 1,
                  p: 1,
                  backgroundColor: '#2C3333',
                  borderRadius: '15px',
                }}
              >
                <div className='flex flex-col text-white-F1 font-semibold text-xl m-2'>
                  <Link to='/sign-in' className='mb-2 hover:text-green-dark'>
                    Sign in
                  </Link>
                  <Link to='/sign-up' className='hover:text-green-dark'>
                    Sign up
                  </Link>
                </div>
              </Box>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
};

export default TogglePerson;
