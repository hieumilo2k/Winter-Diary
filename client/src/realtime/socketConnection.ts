import io from 'socket.io-client';
export const connectWithSocketServer = (userId: string) => {
  const socket = io('http://localhost:5000/diary', {
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

  return socket;
};
