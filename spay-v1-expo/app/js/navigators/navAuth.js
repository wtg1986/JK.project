import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import ScrAuthMobile from '../containers/auth/scrAuthMobile'
import ScrAuthPass from '../containers/auth/scrAuthPass'
import ScrAuthPincode from '../containers/auth/scrAuthPincode'
import ScrAuthResult from '../containers/auth/scrAuthResult'

// Routes Xác thực
export const authRoutes =  
{
  ScrAuthMobile : ScrAuthMobile,
  ScrAuthPass : ScrAuthMobile,
  ScrAuthPincode : ScrAuthPincode,
  ScrAuthResult : ScrAuthResult
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
