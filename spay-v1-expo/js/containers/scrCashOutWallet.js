import React, { Component } from 'react';
import {View,TouchableOpacity,Text, ScrollView,StyleSheet} from 'react-native';
import { color } from '../utils/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import BoxInput from '../components/boxInput';
import BoxSelect from '../components/boxSelect';
import Gird from '../components/girdGroup';
import BoxGamePurchase from '../components/boxGamePurchase';
import Button from '../components/button';
import {imgATM,imgVisa,imgDaiLy,imgBarCode} from '../../assets';


export class scrCashOutWallet extends Component {
    static navigationOptions = {
        title : 'RÚT TIỀN TỪ VÍ',
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
            
                <BoxInput
                    header = 'SỐ TIỀN MUỐN RÚT'
                    input = {[
                        {key : 'Money',
                        type : 'default',
                        default : 'Nhập số tiền',
                        iconName : 'coin',
                        color : color.primary,
                        unit : 'VNĐ',
                        suggest : [{'key':'50,000,000'},{'key':'10,000,000'},{'key':'5,000,000'},{'key':'1,000,000'},
                        {'key':'500,000'},{'key':'200,000'},{'key':'100,000'},]},
                    ]}
                />
                
                <BoxSelect
                    header = 'CHỌN HÌNH RÚT TIỀN'
                    input = {[
                        {key: 'ATMBank',
                        image: imgATM,
                        imageSize: {h:50,w:50},
                        title: 'Ngân Hàng Nội Địa',
                        description: 'Rút tiền về tài khoản ngân hàng'},

                        {key: 'DaiLySpay',
                        image: imgDaiLy,
                        imageSize: {h:50,w:50},
                        title: 'Đại Lý SPAY',
                        description: 'Rút tiền từ các đại lý Spay'},

                        {key: 'QRCodeSpay',
                        image: imgBarCode,
                        imageSize: {h:50,w:50},
                        title: 'Mã Rút Tiền',
                        description: 'Tạo mã rút tiền để trao đổi với người khác'},

                    ]}
                    mutilselect = {false}
                    onSelect = {(selectItem) => {
                        // alert (selectItem)
                    }}
                />
                
                <Text style = {{fontSize:17, fontStyle:'italic', marginLeft:5, marginTop: 15,color:color.textGray}}>
                    Số dư: <Text style = {{fontWeight:'bold', color : color.primary}}> 1,302,000 </Text>vnđ
                </Text>

                <Text style = {{fontSize:15, fontStyle:'italic', marginLeft:5, marginTop: 15,color:color.textGray}}>
                    Số tiền rút tối hiểu: 100.000 đ {'\n'}
                    Phí rút tiền: 0% {'\n'}
                </Text>
            </View>

            <Button text = 'TIẾP TỤC' fontSize = {17} height = {50} 
                onPress = {()=>{
                    this.props.navigation.navigate('ScrCashOutWalletConfirm')
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
export default scrCashOutWallet

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