import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  openSidebar: boolean;
  setOpenSidebar: (openSidebar: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebar, setOpenSidebar }) => {
  const checkModalOutSide = useRef<HTMLDivElement>(null);

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
        <div className='flex flex-col'>
          <div className='text-white-F1'>Avatar</div>
          <div className='text-white-F1'>
            <Link to='/'>Bút : Write Diary</Link>
          </div>
          <div className='text-white-F1'>
            <Link to='/'>List : List Diaries</Link>
          </div>
          <div className='text-white-F1'>Lịch</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
