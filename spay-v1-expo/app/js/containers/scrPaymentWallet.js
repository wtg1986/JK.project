import React, { Component } from 'react';
import {View,TouchableOpacity,Text, ScrollView,StyleSheet} from 'react-native';
import { color } from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import BoxInput from '../components/boxInput';
import BoxSelect from '../components/boxSelect';
import Gird from '../components/girdGroup';
import BoxGamePurchase from '../components/boxGamePurchase';
import Button from '../components/button';
// import PopupAuth from '../components/popupAuth';
import {imgATM,imgVisa,imgDaiLy} from '../../assets';


export class scrPaymentWallet extends Component {
    static navigationOptions = {
        title : 'NẠP TIỀN VÀO VÍ',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };

//   static propTypes = {
//     prop: PropTypes
//   };

render() {
    
    return (
        // <ScrollView keyboardShouldPersistTaps ='always'>
        <View style ={style.root}>
            <View >
            
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
                        image: imgATM,
                        imageSize: {h:50,w:60},
                        title: 'Thẻ Ngân Hàng Nội Địa',
                        description: 'Thu phí 0%'},

                        {key: 'VisaBank',
                        image: imgVisa,
                        imageSize: {h:50,w:60},
                        title: 'Thẻ Visa - Master - JCB',
                        description: 'Thu phí 3%'},

                        {key: 'DaiLySpay',
                        image: imgDaiLy,
                        imageSize: {h:50,w:60},
                        title: 'Đại Lý SPAY',
                        description: 'Chiết khấu 5%'},

                    ]}
                    multiSelect = {false}
                    onSelect = {(selectItem) => {
                        // alert (selectItem)
                    }}
                />

                <Text style = {{fontStyle:'italic', marginLeft:10, marginTop: 15,color:color.textGray}}>
                    Số tiền tối hiểu: 50.000 đ {'\n'}
                    Nạp bằng thẻ cào: phí 17% {'\n'}
                    Nạp bằng ATM/Internet Banking: Miễn phí {'\n'}
                    Nạp bằng thẻ tín dụng Visa, Master: phí 3% {'\n'}
                    Nạp từ Đại Lý SPay: triết khấu 5%
                </Text>
            </View>

            <Button text = 'TIẾP TỤC' fontSize = {17} height = {50} 
                onPress = {()=>{
                    this.props.navigation.navigate('ScrPaymentWalletAgency')
                }}
            />

        </View>
        // </ScrollView>
    )
  };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrPaymentWallet

const style = StyleSheet.create(
{
    root : {
        flex : 1, 
        justifyContent : 'space-between',
        paddingHorizontal : 15,
        paddingBottom: 15,
        backgroundColor : color.background,
    },
})