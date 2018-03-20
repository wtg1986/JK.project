// import React from 'react';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';

// import AppReducer from './app/src/reducers';
// import AppWithNavigationState from './app/src/navigators/AppNavigator';
// import { middleware } from './app/src/utils/redux';

// const store = createStore(
//   AppReducer,
//   applyMiddleware(middleware),
// );

// export default class AppSpay extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <AppWithNavigationState />
//       </Provider>
//     );
//   }
// }


import React from 'react';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';

// import AppReducer from './app/src/reducers';
import AppNavigator from './app/src/navigators/StartNavigator';
// import { middleware } from './app/src/utils/redux';
import thunk from 'redux-thunk';
// const store = createStore(
//   AppReducer,
//   applyMiddleware(middleware),
// );

const appState = {
  mobile : '097.365.1368'
}


const getUserById = id => async (getState, dispatch) => {
  try{
      const {token} = await callGetUserApi(id);
      const response = await callGetReportApi(token);
      const report = JSON.parse(response.report);
      dispatch({
          type:"GET_REPORT_SUCCESS",
          payload:report
      });
  }catch(error){
     dispatch({
          type:"GET_REPORT_FAIL",
          payload:{message:"fail to get report"}
      }); 
  }
}



const reduer = (state = appState, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {...state,mobile : '0968.434.969'}
    
  }
  return state
}

import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';

const store = createStore(reduer,applyMiddleware(thunk))

export default class AppSpay extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}