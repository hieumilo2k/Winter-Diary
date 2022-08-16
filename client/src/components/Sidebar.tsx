import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { Avatar } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface SidebarProps {
  openSidebar: boolean;
  setOpenSidebar: (openSidebar: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebar, setOpenSidebar }) => {
  const checkModalOutSide = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAppSelector((state: AppState) => state.user);

  const docId = (userId: string) => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${year}${month}${day}${userId}`;
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        checkModalOutSide.current &&
        !checkModalOutSide.current.contains(e.target as Node)
      ) {
        const target = e.target as HTMLElement;
        const target1 = target.parentElement as HTMLElement;
        if (target1.id !== 'menu') {
          setOpenSidebar(false);
        }
      }
    };
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={checkModalOutSide}>
      <div className={`modal ${openSidebar ? 'open' : ''}`}>
        <div className='flex flex-col items-center min-h-full justify-around'>
          <div className='text-white-F1 flex items-center justify-between'>
            <Avatar
              className='m-[36px] cursor-pointer'
              sx={{ width: 90, height: 90 }}
              src={user.avatar}
              onClick={() => navigate('/profile')}
            />
            <h1
              className='text-2xl font-dynaPuff cursor-pointer'
              onClick={() => navigate('/profile')}
            >{`${user.firstName} ${user.lastName}`}</h1>
          </div>
          <div className='text-white-F1 text-3xl'>
            <Link
              to={`/add-diary/${docId(user.id)}`}
              className='flex hover:scale-125'
            >
              <MenuBookIcon className='mt-1' />
              <ModeEditIcon className='mr-2 mt-1' />
              <p className='font-semibold'>Write Diary</p>
            </Link>
          </div>
          <div className='text-white-F1 text-xl'>
            <Link to='/all-diaries' className='flex hover:scale-125'>
              <ViewStreamIcon className='mr-2 mt-[2px]' />
              <p>List Diaries</p>
            </Link>
          </div>
          <div className='calendar'>
            <Calendar
              className='font-dynaPuff rounded-3xl p-3'
              defaultValue={new Date()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
