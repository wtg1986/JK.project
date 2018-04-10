import React, { Component } from 'react';
import {View,TouchableOpacity,Text, ScrollView,StyleSheet} from 'react-native';
import { color } from '../utils/theme';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    let money = 0;
    let method = ''
    return (
        // <ScrollView keyboardShouldPersistTaps ='always'>
        <View style ={style.root}>
            {/* <ScrollView keyboardShouldPersistTaps ='always'> */}
            <View style ={{flex : 1}}>
            
                <BoxInput
                    header = 'SỐ TIỀN MUỐN NẠP'
                    input = {[
                        {key : 'Money',
                        type : 'default',
                        default : 'Nhập số tiền',
                        iconName : 'coin',
                        color : color.primary,
                        unit : 'VNĐ',
                        suggest : [{'key':'10,000,000'},{'key':'5,000,000'},{'key':'2,000,000'},{'key':'1,000,000'},
                        {'key':'500,000'},{'key':'200,000'},{'key':'100,000'},{'key':'50,000'},]},
                    ]}
                    onEndEditing = {(value) => {
                        money = value
                    }}
                />
                
                <BoxSelect
                    header = 'CHỌN HÌNH THỨC NẠP'
                    input = {[
                        {key: 'ATMBank',
                        image: imgATM,
                        imageSize: {h:50,w:50},
                        title: 'Thẻ Ngân Hàng Nội Địa',
                        description: 'Thu phí 0%'},

                        {key: 'VisaBank',
                        image: imgVisa,
                        imageSize: {h:50,w:50},
                        title: 'Thẻ Visa - Master - JCB',
                        description: 'Thu phí 3%'},

                        {key: 'DaiLySpay',
                        image: imgDaiLy,
                        imageSize: {h:50,w:50},
                        title: 'Đại Lý SPAY',
                        description: 'Chiết khấu 5%'},

                    ]}
                    mutilselect = {false}
                    onSelect = {(i,selectItem) => {
                        method = selectItem
                    }}
                />

                 <Text style = {{fontSize:17, fontStyle:'italic', marginLeft:5, marginTop: 15,color:color.textGray}}>
                    Số dư: <Text style = {{fontWeight:'bold', color : color.primary}}> {this.props.balance} </Text>vnđ
                </Text>

                <Text style = {{fontSize:15, fontStyle:'italic', marginLeft:5, marginTop: 15,color:color.textGray}}>
                    Số tiền tối hiểu: 50.000 đ {'\n'}
                </Text>
            </View>


            <Button text = 'TIẾP TỤC' fontSize = {17} height = {50} 
                onPress = {()=>{
                    if (money!==0 && method==='DaiLySpay')
                    this.props.navigation.navigate('ScrPaymentWalletAgency')
                }}
            />
             {/* </ScrollView> */}
        </View>

       
    )
  };
};

const mapStateToProps = (state) => ({
  balance : state.balance
})

// const mapDispatchToProps = {
  
// };

export default connect(mapStateToProps)(scrPaymentWallet)
// export default scrPaymentWallet

const style = StyleSheet.create(
{
    root : {
        flex : 1, 
        justifyContent : 'space-between',
        paddingHorizontal : 10,
        paddingBottom: 15,
        backgroundColor : color.background,
    },
})