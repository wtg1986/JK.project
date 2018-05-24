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
import ScrPaymentWalletAgency from '../containers/scrPaymentWalletAgency';
import ScrPaymentGamePurchase from '../containers/scrPaymentGamePurchase';
import ScrQRCodeScanHelp from '../containers/scrQRCodeScanHelp';
import ScrCashOutWalletAgency from '../containers/scrCashOutWalletAgency';
import ScrCashOutWalletCode from '../containers/scrCashOutWalletCode';
import ScrPaymentWalletQrCode from '../containers/scrPaymentWalletQrCode';
import ScrChat from '../containers/scrChat';

//Test cac componet 
import Test from '../containers/scrTmp';

export default SwitchNavigator(
  {
    Test: ScrChat,
    Loading: Loading,
    // Onboarding: NavOnboarding,
    Auth: NavAuth,
    Main: StackNavigator({
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
      ScrPaymentGamePurchase : ScrPaymentGamePurchase,
      ScrPaymentWalletAgency : ScrPaymentWalletAgency,
      ScrQRCodeScanHelp : ScrQRCodeScanHelp,
      ScrCashOutWalletAgency : ScrCashOutWalletAgency,
      ScrCashOutWalletCode : ScrCashOutWalletCode,
      ScrPaymentWalletQrCode : ScrPaymentWalletQrCode,
      ScrChat : ScrChat
    },{
      initialRouteName: 'MainTab',
      mode :'card',
      headerMode : 'screen'  
    }) 
  },
  {
    initialRouteName: 'Loading',
  }
);
