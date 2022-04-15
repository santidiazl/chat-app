import io from 'socket.io-client';
import { store } from './store';
import { addOnlineUser } from './store/chat';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('connected to server');

  socket.on('add-online-user', (id) => {
    store.dispatch(addOnlineUser(id));
  });
});

export default socket;
