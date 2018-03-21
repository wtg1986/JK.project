import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import {StackNavigator} from 'react-navigation'

import AppReducer from './reducers'
import AppNavigator from './navigators';

const store = createStore(
  AppReducer,
  applyMiddleware(thunk),
);

class App extends React.Component {
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
