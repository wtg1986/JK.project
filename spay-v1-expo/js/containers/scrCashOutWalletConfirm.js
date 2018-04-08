import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import React, { Component } from 'react';
import { color } from '../utils/theme';
import Box from '../components/box';
import BoxInput from '../components/boxInput';
import Button from '../components/button';

export class scrCashOutWalletConfirm extends Component {

    static navigationOptions = {
        header :null
    };

    render() {
        let input = [
            {key : 'discountCode',
            type : 'default',
            default : 'Nhập mã giảm giá',
            iconName : 'wallet-giftcard',
            color : color.primary,}
        ]
            
        return (
            <View style ={style.root}>
                <KeyboardAvoidingView behavior="position">
                    <Box header = ' XÁC NHẬN RÚT TIỀN'>
                        <View style = {style.rowText}> 
                            <Text style = {style.textInfo}>Hình thức rút tiền:</Text> 
                            <Text style = {[style.textInfo,{fontWeight: 'bold'}]}>Tạo code</Text>
                        </View>

                        <View style = {style.rowText}> 
                            <Text style = {style.textInfo}>Số tiền:</Text> 
                            <Text style = {[style.textInfo,{fontWeight: 'bold'}]}>300,000đ</Text>
                        </View>

                        <View style = {style.rowText}> 
                            <Text style = {style.textInfo}>Phí giao dịch:</Text> 
                            <Text style = {[style.textInfo,{fontWeight: 'bold'}]}>Miễn phí</Text>
                        </View>

                        <View style = {[style.rowText,{marginBottom:10}]}> 
                            <Text style = {style.textInfo}>Điểm thưởng:</Text> 
                            <Text style = {[style.textInfo,{fontWeight: 'bold'}]}>0đ</Text>
                        </View>

                        <BoxInput 
                            input = {input}
                            hasBox = {false}
                            onEndEditing = {(res)=>{
                                // this._data[res.key] = res.value
                                // onChangeInput && onChangeInput(this._data)
                            }}>
                        </BoxInput>
                        
                        <View style = {[style.rowText,{marginTop:20}]}> 
                            <Text style = {style.textTotal}>Thanh toán:</Text> 
                            <Text style = {[style.textTotal,{fontWeight: 'bold'}]}>200,000</Text>
                        </View>

                    </Box>

                    <Button
                        fontSize = {18}
                        text = 'ĐỒNG Ý'
                        backgroundColor = {color.box}
                        textColor = {color.primary}
                        height = {50}
                        onPress = {()=>{
                            this.props.navigation.navigate('ScrCashOutWalletCode')
                        }}
                    />  

                    <Text style ={{
                        marginTop : 20,
                        fontSize : 18,
                        color : color.white,
                        alignSelf: 'center',
                    }}>
                        HỦY
                    </Text>
                    
                </KeyboardAvoidingView>
            </View>
        )
    };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrCashOutWalletConfirm

const style = StyleSheet.create(
{
    root : {
        flex : 1,
        backgroundColor : color.primary,
        padding : 10,
        justifyContent : 'center',
    },
    rowText :{
        marginVertical: 5,
        marginHorizontal: 10, 
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    textInfo : {
        color : color.textDark,
        fontSize: 16,
    },
    textTotal : {
        color : color.secondary,
        fontSize: 20,
    }
})