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

// import { Permissions, Notifications } from 'expo';
// const PUSH_ENDPOINT = 'http://192.168.1.134:9999/push';

const store = createStore(
  AppReducer,
  applyMiddleware(thunk),
);
// utils

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.socket = io(serverPush,{jsonp:false});
    this.socket.on('newMessage_server', res => {alert("Duy Khanh")}) // lắng nghe event có tên 'id'
  //   this.socket.on('newMessage_server', (response) => {this.newMessage(response)}); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
    // registerForPushNotificationsAsync()
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


