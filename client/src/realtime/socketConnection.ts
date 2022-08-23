import io, { Socket } from 'socket.io-client';
import { Value } from 'react-quill';
import { loadDiary, receiveChanges } from './handlerDiary';

interface ServerToClientEvents {
  loadDiary: (document: Value) => void;
  receiveChanges: (document: Value) => void;
}

interface ClientToServerEvents {
  getDiary: (docId: string) => void;
  saveDiary: (document: Value) => void;
  sendChanges: (data: sendChangeDto) => void;
}

interface sendChangeDto {
  ident: string;
  document: Value;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const connectWithSocketServer = (userId: string) => {
  socket = io(`${process.env.REACT_APP_SERVER_URL}/diary`, {
    auth: {
      id: userId,
    },
  });

  socket.on('connect', () => {
    console.log('Successfully connected with socket.io server', socket.id);
  });

  socket.on('connect_error', (error) => {
    if (error.message === 'NOT_AUTHORIZED') {
      window.location.href = '/';
    }
  });

  socket.once('loadDiary', (document: Value) => {
    loadDiary(document);
  });

  socket.on('receiveChanges', (document: Value) => {
    receiveChanges(document);
  });
};

export const getDiary = (docId: string) => {
  socket.emit('getDiary', docId);
};

export const saveDiary = (document: Value) => {
  socket.emit('saveDiary', document);
};

export const sendChanges = (data: sendChangeDto) => {
  socket.emit('sendChanges', data);
};

export const socketDisconnect = () => {
  socket.disconnect();
};
