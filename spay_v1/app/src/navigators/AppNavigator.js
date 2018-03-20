import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator,TabNavigator,TabBarBottom } from 'react-navigation';
import { addListener } from '../utils/redux';

import Icon from 'react-native-vector-icons/Feather';
import LoginScreen from '../components/demo/LoginScreen';
import MainScreen from '../components/demo/MainScreen';
import ProfileScreen from '../components/demo/ProfileScreen';
import SettingScreen from '../components/demo/SettingScreen';

// Khởi tạo router dạng điều hương stack
export const AppNavigator = StackNavigator(
  {
    Main: { screen: MainScreen },
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    // headerMode : 'none'
  }
);

export const AppNavigator1 =  TabNavigator(
  {
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen },
    Setting: { screen: SettingScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Login') {
          iconName = 'home';
        } else if (routeName === 'Main') {
          iconName = 'globe';
        } else if (routeName === 'Profile') {
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

class AppWithNavigationState extends React.Component {
  //Khao báo propType cho các prop nhận từ store redux
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        //Chỉnh sửa lại navigation để dùng với redux. Chuyền vào từ state, dispatch từ store redux.
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
