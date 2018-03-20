import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator,TabNavigator,TabBarBottom } from 'react-navigation';
import LoginScr  from '../components/screens/LoginScr';
import HomeScr  from '../components/screens/HomeScr';
import DiscoveryScr  from '../components/screens/DiscoveryScr';
import NotificationScr  from '../components/screens/NotificationScr';
import SettingScr  from '../components/screens/SettingScr';
import Icon from 'react-native-vector-icons/Feather';
import { AppColor } from '../utils/color';

export const AppNavigator =  TabNavigator(
    {
      Home: { screen: HomeScr },
      Discovery: { screen: DiscoveryScr },
      Notification: { screen: NotificationScr },
      Setting: { screen: SettingScr },
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = 'home';
          } else if (routeName === 'Discovery') {
            iconName = 'globe';
          } else if (routeName === 'Notification') {
            iconName = 'bell';
          } else if (routeName === 'Setting') {
            iconName = 'settings';
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Icon name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          borderTopWidth: 0,
          backgroundColor: 'white',
        },
        labelStyle :{
          fontSize : 13
        },
        showLabel :false
      },
      animationEnabled: true,
      swipeEnabled: true,
      activeBackgroundColor:'white',
      inactiveBackgroundColor : 'white'
    }
  );

  export default class AppWithNavigationState extends React.Component {
    //Khao báo propType cho các prop nhận từ store redux
    // static propTypes = {
    //   dispatch: PropTypes.func.isRequired,
    //   nav: PropTypes.object.isRequired,
    // };
  
    render() {
    //   const { dispatch, nav } = this.props;
      return (
        <AppNavigator
        //   //Chỉnh sửa lại navigation để dùng với redux. Chuyền vào từ state, dispatch từ store redux.
        //   navigation={addNavigationHelpers({
        //     dispatch,
        //     state: nav,
        //     addListener,
        //   })}
        />
      );
    }
  }
  
//   const mapStateToProps = state => ({
//     nav: state.nav,
//   });
  
//   export default connect(mapStateToProps)(AppWithNavigationState);