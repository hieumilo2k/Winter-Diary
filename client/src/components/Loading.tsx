import React from 'react';

const Loading = () => {
  return (
    <div className='text-center m-[10rem]'>
      <div className='lds-heart'>
        <div></div>
      </div>
      <h1 className='text-white-F1 font-oleo-script text-3xl mt-5 loading'>
        Loading ...
      </h1>
    </div>
  );
};

export default Loading;
