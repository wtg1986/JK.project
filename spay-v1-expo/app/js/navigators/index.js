import NavAuth from './navAuth';
// import NavOnboarding from './navOnboarding';
import NavMainTab from './navMainTab';

import Loading from '../containers/scrLoading' 
import {StackNavigator,SwitchNavigator} from 'react-navigation'

import ScrBookHomeStay from '../containers/scrBookHomeStay';
import ScrBuyCardCode from '../containers/scrBuyCardCode';
import ScrCashOutWallet from '../containers/scrCashOutWallet';
import ScrLinkBlockchain from '../containers/scrLinkBlockchain';
import ScrLuckyWheel from '../containers/scrLuckyWheel';
import ScrMyBag from '../containers/scrMyBag';
import ScrNotification from '../containers/scrNotification';
import ScrPaymentGame from '../containers/scrPaymentGame';
import ScrPaymentWallet from '../containers/scrPaymentWallet';
import ScrProfile from '../containers/scrProfile';
import ScrQRCodeScan from '../containers/scrQRCodeScan';
import ScrRadarCode from '../containers/scrRadarCode';
import ScrSellCardCode from '../containers/scrSellCardCode';
import ScrSetting from '../containers/scrSetting';
import ScrTranferMoney from '../containers/scrTranferMoney';

//Test cac componet 
import Test from '../components/boxInput';

export default SwitchNavigator(
  {
    Test: Test,
    Loading: Loading,
    // Onboarding: NavOnboarding,
    Auth: NavAuth,
    Main: StackNavigator( {
      MainTab: NavMainTab,
      ScrProfile: ScrProfile,
      ScrPaymentWallet : ScrPaymentWallet,
      ScrCashOutWallet : ScrCashOutWallet,
      ScrQRCodeScan : ScrQRCodeScan,
      ScrMyBag : ScrMyBag,

      ScrPaymentGame : ScrPaymentGame,
      ScrTranferMoney : ScrTranferMoney,
      ScrBuyCardCode : ScrBuyCardCode,
      ScrLuckyWheel : ScrLuckyWheel,
      ScrRadarCode : ScrRadarCode,
      ScrSellCardCode : ScrSellCardCode,
      ScrBookHomeStay : ScrBookHomeStay,
      ScrLinkBlockchain : ScrLinkBlockchain,
      
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
