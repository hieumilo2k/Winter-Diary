import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

const Home = () => {
  return (
    <>
      <div className='flex flex-row justify-between'>
        <div>
          <MenuIcon className='text-white-F1  m-[35px] text-5xl cursor-pointer hover:scale-125' />
        </div>
        <div className='w-64 my-[35px]'>
          <Logo />
        </div>
        <div>
          <PersonIcon className='text-white-F1 m-[35px] text-5xl cursor-pointer hover:scale-125' />
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
    </>
  );
};

export default Home;
