import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

const Error = () => {
  return (
    <>
      <div className='flex flex-col items-center m-[35px] font-oleo-script'>
        <div>
          <p className='text-white-F1 text-9xl my-5'>404</p>
        </div>
        <div className='flex flex-col items-center'>
          <p className='text-white-F1 text-6xl'>Oops...</p>
          <p className='text-white-F1 text-6xl'>Sorry, the page not found</p>
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
              window.open('https://github.com/ngohieu1209', '_blank')
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
            className='text-white-default text-center font-permanent-marker text-5xl hover:text-green-dark'
          >
            go home page
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
