import { Avatar } from '@mui/material';
import { Sources } from 'quill';
import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill, UnprivilegedEditor, Value } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { diaryActions } from '../../app/features/diary/diarySlice';
import { userActions } from '../../app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { Loading, Logo } from '../../components';
import {
  connectWithSocketServer,
  getDiary,
  saveDiary,
  sendChanges,
  socketDisconnect,
} from '../../realtime/socketConnection';

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
  const { user } = useAppSelector((state: AppState) => state.user);
  const { document, open } = useAppSelector((state: AppState) => state.diary);

  const dispatch = useAppDispatch();

  const { docId } = useParams();
  const navigate = useNavigate();

  const [save, setSave] = useState(true);
  const [text, setText] = useState<Value | undefined>(document);

  const handleChange = (
    value: string,
    delta: Value,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    setText(value);
    if (source === 'user' && docId) {
      sendChanges({ document: value, ident: docId });
    }
  };

  useEffect(() => {
    if (user.id && docId && docId.includes(user.id)) {
      connectWithSocketServer(user.id);
      getDiary(docId);
      dispatch(userActions.getUserStart());
    } else {
      navigate('/');
      window.location.replace('/error');
    }

    return () => {
      socketDisconnect();
      dispatch(diaryActions.setClose());
      dispatch(userActions.getUserStart());
    };
  }, [dispatch, docId, navigate, user.id]);

  useEffect(() => {
    if (open && document && text) {
      const interval = setInterval(() => {
        saveDiary(text);
        setSave(true);
      }, SAVE_INTERVAL_MS);

      return () => {
        clearInterval(interval);
        setSave(false);
      };
    }
    //eslint-disable-next-line
  }, [text]);

  useEffect(() => {
    if (open && document) {
      setText(document);
      return () => {
        setText(document);
      };
    }
  }, [open, document]);

  if (!open) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className='relative min-h-screen'>
      <Avatar
        className='fixed left-5 top-14 z-50 bg-transparent hover:scale-125 hover:cursor-pointer'
        alt='home'
        sx={{ width: 120, height: 120 }}
        onClick={() => {
          return navigate('/');
        }}
      >
        <Logo />
      </Avatar>
      <div className='container max-w-full'>
        <ReactQuill
          theme='snow'
          value={text}
          onChange={handleChange}
          modules={{ toolbar: TOOLBAR_OPTIONS }}
        />
      </div>
      <div className='absolute bottom-0 top-0 right-0 left-0 bg-grey-darkHover -z-50'></div>
      <div className='absolute top-1 left-12 z-50 font-permanent-marker'>
        <p>{save ? 'saved !' : 'saving ...'}</p>
      </div>
    </div>
  );
};

export default AddDiary;
