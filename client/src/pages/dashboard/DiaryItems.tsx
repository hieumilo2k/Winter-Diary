import { Box } from '@mui/material';
import cryptoJs from 'crypto-js';
import React, { useEffect, useState } from 'react';
import ReactQuill, { Value } from 'react-quill';
import diaryApi from '../../api/diaryApi';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '80%',
  overflowY: 'auto',
  backgroundColor: '#eed180',
  border: '2px solid #000',
  boxShadow: 24,
  p: '0.6in',
  borderRadius: '20px',
};

interface DiaryItemsProps {
  docId: string;
}

const DiaryItems: React.FC<DiaryItemsProps> = ({ docId }) => {
  const [doc, setDoc] = useState<Value>('Loading ...');
  useEffect(() => {
    const fetchDocument = async () => {
      const { data } = await diaryApi.getDocument(docId);
      const bytes = cryptoJs.AES.decrypt(
        data.data.toString(),
        `${process.env.REACT_APP_SECRET_AES_KEY}`
      );
      const text = bytes.toString(cryptoJs.enc.Utf8);
      setDoc(text);
    };
    fetchDocument();
  }, [docId]);

  return (
    <div>
      <Box sx={style} className='modalDiary custom-scroll'>
        <ReactQuill theme='bubble' value={doc} readOnly />
      </Box>
    </div>
  );
};

export default DiaryItems;
