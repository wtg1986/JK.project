import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import ScrAuthMobile from '../containers/auth/scrAuthMobile'
import ScrAuthPassLogin from '../containers/auth/scrAuthPassLogin'
import ScrAuthPassRegister from '../containers/auth/scrAuthPassRegister'
import ScrAuthResult from '../containers/auth/scrAuthResult'
import ScrAuthOTP from '../containers/auth/scrAuthOTP';
// Routes Xác thực
export const authRoutes =  
{
  ScrAuthMobile : ScrAuthMobile,
  ScrAuthPassLogin : ScrAuthPassLogin,
  ScrAuthPassRegister : ScrAuthPassRegister,
  ScrAuthOTP : ScrAuthOTP,
  ScrAuthResult : ScrAuthResult,
}

const config = {
  // mode :'',
  headerMode : 'none',
}
  
export default StackNavigator(authRoutes,config);


// const mapStateToProps = state => ({
//   nav: state.nav,
// });

// export default connect(mapStateToProps)(AppWithNavigationState);
