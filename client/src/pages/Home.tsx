import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { TogglePerson, Sidebar } from '../components';
import { Avatar } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';

const Home = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openPerson, setOpenPerson] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isLogged } = useAppSelector((state: AppState) => state.auth);
  const { user } = useAppSelector((state: AppState) => state.user);

  const handleClickPerson = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPerson((previousOpen) => !previousOpen);
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenSidebar((previousOpen) => !previousOpen);
  };

  const canBeOpen = openPerson && Boolean(anchorEl);
  const idTogglePerson = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <div className='flex flex-row justify-between'>
        <div>
          <button type='button' id='menu' onClick={handleClickMenu}>
            <MenuIcon
              id='menu'
              className='text-white-F1  m-[35px] text-5xl cursor-pointer hover:scale-125'
            />
          </button>
        </div>
        <div className='w-64 my-[35px]'>
          <Logo />
        </div>
        <div>
          <button
            type='button'
            aria-describedby={idTogglePerson}
            onClick={handleClickPerson}
          >
            {isLogged ? (
              <Avatar
                className='m-[36px] hover:scale-125'
                sx={{ width: 60, height: 60 }}
                src={user.avatar}
              />
            ) : (
              <PersonIcon className='text-white-F1 m-[35px] text-5xl cursor-pointer hover:scale-125' />
            )}
          </button>
        </div>
      </div>
      <div className='flex items-center w-full'>
        <div className='flex flex-col w-[10%]'>
          <FacebookIcon
            className='text-white-F1 mx-[35px] my-[6px] text-3xl cursor-pointer hover:scale-125 facebook'
            onClick={() =>
              window.open('https://www.facebook.com/ngotrunghieu1209', '_blank')
            }
          />
          <GitHubIcon
            className='text-white-F1 mx-[35px] my-[6px] text-3xl cursor-pointer hover:scale-125'
            onClick={() =>
              window.open('https://github.com/hieumilo2k', '_blank')
            }
          />
          <InstagramIcon
            className='text-white-F1 mx-[35px] my-[6px] text-3xl cursor-pointer hover:scale-125 instagram'
            onClick={() =>
              window.open('https://www.instagram.com/nth__milo/', '_blank')
            }
          />
        </div>
        <div className='w-[80%] text-center'>
          <Link
            to='/'
            className='text-white-default text-center font-permanent-marker text-7xl hover:text-green-dark'
          >
            winter diary
          </Link>
        </div>
      </div>
      {/* Sidebar */}
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      {/* ------- */}

      {/* My Person */}
      <TogglePerson
        openPerson={openPerson}
        anchorEl={anchorEl}
        id={idTogglePerson}
        setOpenPerson={setOpenPerson}
      />
      {/* -------- */}
    </>
  );
};

export default Home;
