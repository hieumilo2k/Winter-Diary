import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Quill, { TextChangeHandler } from 'quill';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { connectWithSocketServer } from '../../realtime/socketConnection';
import { Socket } from 'socket.io-client';
import { Avatar } from '@mui/material';
import { Logo } from '../../components';
import { userActions } from '../../app/features/user/userSlice';

const SAVE_INTERVAL_MS = 2000;

const fontSizeArr = ['20px', '28px', '36px', '48px', '64px'];
let Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

const fontFamilyArr = ['Roboto Slab', 'Cabin', 'Lobster', 'Arial'];
let Font = Quill.import('attributors/style/font');
Font.whitelist = fontFamilyArr;
Quill.register(Font, true);

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ font: fontFamilyArr }],
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

  [{ size: fontSizeArr }], // custom dropdown

  ['clean'], // remove formatting button
];

const AddDiary = () => {
  const [quill, setQuill] = useState<Quill | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const navigate = useNavigate();

  const { docId } = useParams();

  const { user } = useAppSelector((state: AppState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.id) {
      setSocket(connectWithSocketServer(user.id));
      dispatch(userActions.getUserStart());
    }

    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-diary', (document) => {
      console.log('document', document);
      quill.setContents(document);
      quill.enable();
    });

    socket.emit('get-diary', docId);
  }, [socket, quill, docId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-diary', quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler: TextChangeHandler = (delta) => {
      console.log('handlerDelta', delta);
      quill.updateContents(delta);
    };
    socket.on('receive-changes', handler);
    console.log('handler', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler: TextChangeHandler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      console.log('delta', delta);
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper: any) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
      placeholder: 'Hãy viết những dòng cảm xúc của bạn ...',
    });
    q.root.setAttribute('spellcheck', 'false');
    q.disable();
    // q.setText('Loading ...');
    setQuill(q);
  }, []);

  return (
    <div className='relative min-h-screen'>
      <Avatar
        className='fixed left-5 top-14 z-50 bg-transparent hover:scale-125 hover:cursor-pointer'
        alt='home'
        sx={{ width: 120, height: 120 }}
        onClick={() => {
          socket?.disconnect();
          return navigate('/');
        }}
      >
        <Logo />
      </Avatar>
      <div className='container max-w-full' ref={wrapperRef}></div>
      <div className='absolute bottom-0 top-0 right-0 left-0 bg-grey-darkHover -z-50'></div>
    </div>
  );
};

export default AddDiary;
