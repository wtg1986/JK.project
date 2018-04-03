import React, { Component } from 'react';
import {View,TouchableOpacity,Text, ScrollView} from 'react-native';
import { color } from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import BoxInput from '../components/boxInput';
import BoxSelect from '../components/boxSelect';
import Gird from '../components/girdGroup';
import BoxGamePurchase from '../components/boxGamePurchase';
import PopupAuth from '../components/popupAuth';
import * as Assets from '../../assets';


export class scrPaymentWallet extends Component {
    static navigationOptions = {
        title : 'NẠP TIỀN VÀO VÍ',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white
    };

//   static propTypes = {
//     prop: PropTypes
//   };

render() {
    
    return (
        <ScrollView keyboardShouldPersistTaps ='always'>
        <View style ={{
            flex : 1,
            justifyContent : 'flex-start',
            // alignItems : 'center',
            backgroundColor : color.background
        }}>

            {/* <PopupAuth
                imgLogo = {require('../../assets/logos/logoSpay.png')} 
                txtNotification = 'Nhập mã xác thực số điện thoại'
                txtButon = 'TIẾP TỤC'
                enumInputType = 'PIN_CODE'
                autoFocus = {true}
                onAction = {()=>{
                    this.props.navigation.navigate('ScrRadarCode')
                }}
            >
            </PopupAuth> */}

            <BoxInput
                header = 'SỐ TIỀN MUỐN NẠP'
                input = {[
                    {key : 'Money',
                    type : 'default',
                    default : 'Nhập số tiền',
                    color : color.primary,
                    unit : 'VNĐ',
                    suggest : [{'key':'10,000'},{'key':'20,000'},{'key':'50,000'},{'key':'100,000'},
                    {'key':'200,000'},{'key':'500,000'},{'key':'1,000,000'},{'key':'5,000,000'},]},
                ]}
            />
            
            <BoxSelect
                header = 'CHỌN HÌNH THỨC NẠP'
                input = {[
                    {key: 'ATMBank',
                    image: Assets.imgATM,
                    imageSize: {h:50,w:50},
                    title: 'Thẻ Ngân Hàng Nội Địa',
                    description: 'Thu phí 0%'},

                    {key: 'VisaBank',
                    image: Assets.imgVisa,
                    imageSize: {h:50,w:50},
                    title: 'Thẻ Visa - Master - JCB',
                    description: 'Thu phí 3%'},

                    {key: 'DaiLySpay',
                    image: Assets.imgDaiLy,
                    imageSize: {h:50,w:50},
                    title: 'Đại Lý SPAY',
                    description: 'Chiết khấu 5%'},

                ]}
                multiSelect = {false}
                onSelect = {(selectItem) => {
                    // alert (selectItem)
                }}
            />

        </View>
        </ScrollView>
    )
  };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrPaymentWallet
