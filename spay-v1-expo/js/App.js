import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {StackNavigator} from 'react-navigation'
import {serverPush} from '../js/utils/global';
import AppReducer from './reducers'
import AppNavigator from './navigators';

// window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';

import { Permissions, Notifications } from 'expo';
const PUSH_ENDPOINT = 'http://192.168.1.134:9999/push';

const store = createStore(
  AppReducer,
  applyMiddleware(thunk),
);
// utils

async function registerForPushNotificationsAsync() {
  
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.socket = io(serverPush,{jsonp:false});
    this.socket.on('newMessage_server', res => {alert("Duy Khanh")}) // lắng nghe event có tên 'id'
  //   this.socket.on('newMessage_server', (response) => {this.newMessage(response)}); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
    registerForPushNotificationsAsync()
}

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

// AppRegistry.registerComponent('ReduxExample', () => ReduxExampleApp);

export default App;


