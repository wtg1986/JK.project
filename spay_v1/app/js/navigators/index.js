import NavAuth from './navAuth';
// import NavOnboarding from './navOnboarding';
import NavMainTab from './navMainTab';

import Loading from '../containers/scrLoading' 
import {StackNavigator,SwitchNavigator} from 'react-navigation'

import ScrProfile from '../containers/scrProfile';
import ScrPaymentGame from '../containers/scrPaymentGame';

export default SwitchNavigator(
  {
    Loading: Loading,
    // Onboarding: NavOnboarding,
    Auth: NavAuth,
    Main: StackNavigator( {
      MainTab: NavMainTab,
      ScrProfile: ScrProfile,
      ScrPaymentGame : ScrPaymentGame
    },{
      initialRouteName: 'MainTab',
      mode :'card',
      headerMode : 'screen'
    }) 
  },
  {
    initialRouteName: 'Main',
  }
);
