import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import {StackNavigator} from 'react-navigation'

import AppReducer from './reducers'
import AppNavigator from './navigators';

window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';

const store = createStore(
  AppReducer,
  applyMiddleware(thunk),
);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.socket = io('http://localhost:6969',{jsonp:false});
    this.socket.on('newMessage_server', res => {alert("Duy Khanh")}) // lắng nghe event có tên 'id'
  //   this.socket.on('newMessage_server', (response) => {this.newMessage(response)}); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
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
