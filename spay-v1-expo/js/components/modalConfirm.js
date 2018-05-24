import {
    StyleSheet, 
    Text,
    View,
    Modal,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { color } from '../utils/theme';
import Box from '../components/box';
import BoxInput from '../components/boxInput';
import Button from '../components/button';

export default class modalConfirm extends Component {

//------------------------------------------------------------------------------------------
    static propTypes = {
        header : PropTypes.string,
        title : PropTypes.array,
        titleFinal : PropTypes.array,
        textInputDefault : PropTypes.string,
        onAction : PropTypes.func,
        onClose : PropTypes.func
    };
    
//------------------------------------------------------------------------------------------
    static defaultProps = {
        header : 'XÁC NHẬN NẠP TIỀN',
        title : [
            {leftText: 'Hình thức nạp tiền:', rightText: 'Đại Lý Spay'},
            {leftText: 'Số tiền:', rightText: '500,000đ'},
            {leftText: 'Triết khấu:', rightText: '5%'},
            {leftText: 'Điểm thưởng:', rightText: '5 điểm'},
        ],
        titleFinal : [
            {leftText: 'Thanh toán:', rightText: '270,000đ'}
        ],
        textInputDefault : null,
    }
//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
        this.state = { 
        };
    }

//------------------------------------------------------------------------------------------

    render() {

        let {header,title,titleFinal,textInputDefault} = this.props

        let input = [
            {
                key : 'discountCode',
                type : 'default',
                default : textInputDefault,
                iconName : 'wallet-giftcard',
                color : color.primary,
            }
        ]

        return (
            <Modal transparent = {true} animationType = 'slide'>
                <View style ={style.root}>

                    <KeyboardAvoidingView behavior="position">
                    
                        <Box header = {header}>
                            {
                                title.map((obj,i)=>{return(
                                    <View style = {style.rowText}> 
                                        <Text style = {style.textInfo}>{obj.leftText}</Text> 
                                        <Text style = {[style.textInfo,{fontWeight: 'bold'}]}>{obj.rightText}</Text>
                                    </View>)
                                })
                            }
                            
                            {textInputDefault &&
                            <BoxInput 
                                input = {input}
                                hasBox = {false}
                                onEndEditing = {(res)=>{
                                
                                }}
                            />}

                            {
                                titleFinal.map((obj,i)=>{return(
                                    <View style = {[style.rowText,{marginTop:20}]}> 
                                        <Text style = {style.textTotal}>{obj.leftText}</Text> 
                                        <Text style = {[style.textTotal,{fontWeight: 'bold'}]}>{obj.rightText}</Text>
                                    </View>)
                                })
                            }

                        </Box>

                        <Button
                            fontSize = {18}
                            text = 'ĐỒNG Ý'
                            backgroundColor = {color.box}
                            textColor = {color.primary}
                            height = {50}
                            onPress = {()=>{
                                this.props.onAction && this.props.onAction()
                            }}
                        />  

                        <TouchableOpacity onPress = {()=>{
                            this.props.onClose && this.props.onClose()
                        }}>
                            <Text style ={{
                                marginVertical : 20,
                                fontSize : 18,
                                color : color.white,
                                alignSelf: 'center',
                            }}>
                                HỦY
                            </Text>
                        </TouchableOpacity>
                        
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        )
    };
};

//------------------------------------------------------------------------------------------

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