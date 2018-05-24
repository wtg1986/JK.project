import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
import { TabNavigator, TabBarBottom} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../utils/theme';
import ScrHome from '../containers/scrHome'
// import ScrDiscovery from '../containers/scrDiscovery'
import ScrNotification from '../containers/scrNotification'
import ScrSetting from '../containers/scrSetting'
import ScrAgency from '../containers/scrAgency';

// Router Tab
const TabRoutes = {
  ScrHome : ScrHome,
  // ScrDiscovery : ScrDiscovery,
  ScrAgency : ScrAgency,
  ScrNotification : ScrNotification,
  ScrSetting : ScrSetting
}

const Config = {
  navigationOptions:  ({navigation})  => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'ScrHome':
          iconName = 'security-home';
          break;
        // case 'ScrDiscovery':
        //   iconName = 'ios-pin';
        //   break;
        case 'ScrAgency':
          iconName = 'motorbike';
          break;
        case 'ScrNotification':
          iconName = 'bell';
          break;
        case 'ScrSetting':
         iconName = 'settings';
          break;
      }
      return <Icon name = {focused ? iconName : iconName + ''} size={32} color={tintColor} />;
    },
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: color.primary,
    inactiveTintColor: color.textGray,
    style: {
      borderTopWidth: 0,
      backgroundColor: color.background,
    },
    labelStyle :{
      fontSize : 13
    },
    showLabel :false,
  },
  animationEnabled: true,
  swipeEnabled: true,
  activeBackgroundColor:'white',
  inactiveBackgroundColor : 'white'
}

export default TabNavigator(TabRoutes,Config);

// class TabNavigator extends Component {
//   render() {
//     // const { dispatch, nav } = this.props;
//     return (
//       <Nav
        
//       />
//     );
//   }
// }

// const mapStateToProps = state => ({
//   nav: state.nav,
// });

// export default connect(mapStateToProps)(AppWithNavigationState);
