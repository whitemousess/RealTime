import {Pusher} from '@pusher/pusher-websocket-react-native';

const pusher = new Pusher('a879d4d4cfc48cfc026b', {
  userAuthentication: {
    endpoint: '/pusher/user-auth',
    transport: 'ajax',
    params: {},
    headers: {},
    customHandler: null,
  },
});

export default pusher;
