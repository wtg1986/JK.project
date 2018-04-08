import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
import { TabNavigator, TabBarBottom} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../utils/theme';
import ScrHome from '../containers/scrHome'
import ScrDiscovery from '../containers/scrDiscovery'
import ScrNotification from '../containers/scrNotification'
import ScrSetting from '../containers/scrSetting'

// Router Tab
const TabRoutes = {
  ScrHome : ScrHome,
  ScrDiscovery : ScrDiscovery,
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
          iconName = 'ios-home';
          break;
        case 'ScrDiscovery':
          iconName = 'ios-pin';
          break;
        case 'ScrNotification':
          iconName = 'ios-notifications';
          break;
        case 'ScrSetting':
         iconName = 'ios-settings';
          break;
      }
      return <Icon name = {focused ? iconName : iconName + '-outline'} size={32} color={tintColor} />;
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
