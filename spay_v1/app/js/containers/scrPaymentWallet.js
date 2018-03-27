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
// import s from '../../assets/logos';


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

            <PopupAuth
                imgLogo = {require('../../assets/logos/logoSpay.png')} 
                txtNotification = 'Nhập mã xác thực số điện thoại'
                txtButon = 'TIẾP TỤC'
                enumInputType = 'PIN_CODE'
                autoFocus = {true}
                onAction = {()=>{
                    this.props.navigation.navigate('ScrRadarCode')
                }}
            >
            </PopupAuth>

            <BoxInput
                header = 'THÔNG TIN CHUYỂN KHOẢN'
                input = {[
                    {key : 'Mobile',
                    type : 'default',
                    default : 'Nhập số điện thoại',
                    color : color.primary,
                    suggest : [{'key':'097.365.1368'},{'key':'096.843.4969'},{'key':'091.272.2282'},]},

                    {key : 'Money',
                    type : 'default',
                    default : 'Nhập số tiền',
                    color : color.primary,
                    unit : 'VNĐ',
                    suggest : [{'key':'10,000'},{'key':'20,000'},{'key':'50,000'},{'key':'100,000'},
                    {'key':'200,000'},{'key':'500,000'},{'key':'1,000,000'},{'key':'5,000,000'},]},
                    ]}
                onEndEditing = {(res)=>{
                    
                }} 

                onFocus = {(obj)=>{
          
                }}
            />
            
            <BoxInput
                header = 'SỐ TIỀN MUỐN NẠP'
                input = {[
                    {key : 'Money',
                    type : 'numbers-and-punctuation',
                    default : 'Nhập số tiền',
                    color : color.primary,}
                ]}
            />
            
            <BoxSelect
                header = 'CHỌN GAME'
                input = {[
                    {key: 'Game_BidaDo',
                    image: require ('../../assets/icons/imgBidaDo.png'),
                    imageSize: {h:44,w:44},
                    title: 'Bida Đỏ',
                    description: 'Chọc là đỏ'},

                    {key: 'Game_TapKich',
                    image: require ('../../assets/icons/imgTapKich.png'),
                    imageSize: {h:44,w:44},
                    title: 'Tập Kích',
                    description: 'Nơi khảng định bản lĩnh'},

                    {key: 'Game_AuMobile',
                    image: require ('../../assets/icons/imgAuMobile.png'),
                    imageSize: {h:44,w:44},
                    title: 'Au Mobile',
                    description: 'Thời trang sang chảnh'},

                ]}
                multiSelect = {false}
                onSelect = {(selectItem) => {
                    // alert (selectItem)
                }}
            />
            <BoxGamePurchase/>>

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
