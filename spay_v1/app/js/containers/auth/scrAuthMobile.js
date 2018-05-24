import React, { Component } from 'react';
import { 
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
 } from 'react-native';
 
import PropTypes from 'prop-types';
import PopupAuth from '../../components/popupAuth'
import {color} from '../../utils/theme';
import {logoSpay,logoVTC} from '../../../assets';

export default class scrAuthMobile extends Component {

//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
    }

//------------------------------------------------------------------------------------------

    render() {
        return (
        <View style = {style.root}>
        
            <KeyboardAvoidingView behavior = "position">
                <View style = {style.body}>
                    <PopupAuth
                        imgLogo = {logoSpay} 
                        txtNotification = 'Nhập số điện thoại để tiếp tục'
                        txtButon = 'TIẾP TỤC'
                        enumInputType = 'NUMBER'
                        autoFocus = {true}
                        onAction = {(value)=>{
                            this.props.navigation.navigate('ScrAuthPass',{mobileNumber : value})
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
            
            <View style = {style.bottom}>
                <Image 
                    style={style.imgLogoVTC} 
                    source={logoVTC}
                />
            </View>
    
        </View>
        )
    }
};

//------------------------------------------------------------------------------------------

const style = StyleSheet.create(
  {
    root : {
        flex : 1,
        backgroundColor : color.background,
        padding : 10,
        justifyContent : 'center',
    },
    body : {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor : color.background
    },
    bottom : {
        height : 80,
        backgroundColor : color.background
    },
    imgLogoVTC :{
        alignSelf: 'center', 
        height: 30,
        resizeMode: 'contain'
    },
  }
)
