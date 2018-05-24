import {
    View,
    TouchableOpacity,
    Text, 
    ScrollView,
    StyleSheet
} from 'react-native';
import React, { Component } from 'react';
import { color } from '../utils/theme';
import { connect } from 'react-redux';
import BoxInput from '../components/boxInput';
import BoxSelect from '../components/boxSelect';
import Gird from '../components/girdGroup';
import BoxGamePurchase from '../components/boxGamePurchase';
import Button from '../components/button';
import {imgATM,imgVisa,imgDaiLy,imgBarCode} from '../../assets';
import ModalConfirm from '../components/modalConfirm';
import * as api from '../utils/api';


export class scrCashOutWallet extends Component {

    static navigationOptions = {
        title : 'RÚT TIỀN TỪ VÍ',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };

    constructor(props) {
        super(props);
        this.state = { 
            isShowModalConfirm : false,
            amount : 0,
            cashoutMethod : null //bank,spay,code
        }
    }

    _showModal = (action) => {

        let textMethod =''
        switch (this.state.cashoutMethod) {
            case 'ATMBank':
                textMethod = 'Ngân Hàng'
                break;
            case 'DaiLySpay':
                textMethod = 'Đại Lý Spay'
                break;
            case 'QRCodeSpay':
                textMethod = 'Code Rút tiền'
                break;
        }

        return(this.state.isShowModalConfirm && 
            <ModalConfirm
                header = 'XÁC NHẬN RÚT TIỀN'
                title = {[
                    {leftText: 'Hình thức rút tiền:', rightText: textMethod},
                    {leftText: 'Số tiền:', rightText: `${this.state.amount}đ`},
                    {leftText: 'Phí rút tiền:', rightText: '1%'},
                    {leftText: 'Điểm thưởng:', rightText: '5 điểm'},
                ]}
                titleFinal = {[
                    {leftText: 'Thanh toán:', rightText: `${this.state.amount}đ`}
                ]}
                textInputDefault = 'Nhập mã giảm giá'
                onClose = {() =>{
                    this.setState(oldState => {
                        return({
                            ...oldState,isShowModalConfirm:false    
                        })
                    })
                }}
                onAction = {action}
            />
        )
    }

    render() {
        
        return (
            // <ScrollView keyboardShouldPersistTaps ='always'>
            <View style ={style.root}>

                <View >
                
                    <BoxInput
                        header = 'SỐ TIỀN MUỐN RÚT'
                        input = {[
                            {key : 'Money',
                            type : 'numeric',
                            default : 'Nhập số tiền',
                            iconName : 'coin',
                            color : color.primary,
                            unit : 'VNĐ',
                            suggest : [{'key':'50,000,000'},{'key':'10,000,000'},{'key':'5,000,000'},{'key':'1,000,000'},
                            {'key':'500,000'},{'key':'200,000'},{'key':'100,000'},]},
                        ]}
                        onEndEditing = {(ip) => {
                            this.setState(oldState => {return({...oldState,amount: ip.value})})
                        }}
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
                        onSelect = {(i,selectItem) => {
                            console.log(selectItem)
                            this.setState(oldState => {return({...oldState,cashoutMethod : selectItem})})
                        }}
                    />
                    
                    <Text style = {{fontSize:17, fontStyle:'italic', marginLeft:5, marginTop: 15,color:color.textGray}}>
                        Số dư: <Text style = {{fontWeight:'bold', color : color.primary}}> {this.props.balance}</Text>vnđ
                    </Text>

                    <Text style = {{fontSize:15, fontStyle:'italic', marginLeft:5, marginTop: 15,color:color.textGray}}>
                        Số tiền rút tối hiểu: 100.000 đ {'\n'}
                        Phí rút tiền: 0% {'\n'}
                    </Text>
                </View>

                <Button text = 'TIẾP TỤC' fontSize = {17} height = {50} 
                    onPress = {()=>{
                        if (this.state.amount <= 0) {
                            alert('Bạn cần nhập số tiền muốn rút') 
                            return
                        }
                        if (this.state.cashoutMethod === 'ATMBank'){
                            alert('Phương thức rút tiền này sẽ hỗ trợ thời gian tới') 
                            return
                        }
                        if (this.state.cashoutMethod === 'QRCodeSpay'){
                            this.setState(oldState => {
                                return({
                                    ...oldState,isShowModalConfirm:true    
                                })
                            })
                            return
                        }
                    }}
                />
                
                {this._showModal(() => {
                    //Gọi API rút tiền accountId, amount,
                    api.accountCashoutCode({accountId: this.props.accountId, amount: this.state.amount},
                        (value) => {
                            // console.log(value)
                            this.setState(oldState => {return({
                                ...oldState, isShowModalConfirm:false
                            })})

                            if (value.error != 0) alert('Có lỗi');
                            else
                            { 
                                // Cập nhật lại Store số dư.
                                this.props.dispatch({type: 'CASH_OUT', amount: this.state.amount});
                                this.props.navigation.navigate('ScrCashOutWalletCode',{cashCode : value.data, amount: this.state.amount}) 
                            }
                        }
                    )
                })}
                
            </View>
            // </ScrollView>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        accountId : state.accountId,
        balance : state.balance
    }
}

// const mapDispatchToProps = {
  
// };

export default connect(mapStateToProps)(scrCashOutWallet)
// export default scrCashOutWallet

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