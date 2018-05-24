import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import AppReducer from './reducers'
import AppNavigator from './navigators';
import Root from './containers/root';

// window.navigator.userAgent = 'react-native';

export const store = createStore(
  AppReducer,
  applyMiddleware(thunk),
);

class App extends React.Component {
  constructor(props) {
    super(props);
}

  render() {
    return (
      <Provider store={store}>  
          <Root>
            <AppNavigator />
          </Root>
      </Provider>
    );
  }
}

// AppRegistry.registerComponent('ReduxExample', () => ReduxExampleApp);

export default App;


