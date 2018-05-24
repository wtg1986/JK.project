import React, { Component } from 'react';
import { 
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView
 } from 'react-native';

import { connect } from 'react-redux';
import PopupAuth from '../../components/popupAuth'
import { color } from '../../utils/theme';
import { logoSpay,logoVTC} from '../../../assets';
import { SecureStore } from 'expo';
import * as api from '../../utils/api';

export class scrAuthMobile extends Component {

//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
    }

    componentWillMount = async() => {
        let myMobileNumber = await SecureStore.getItemAsync('myMobileNumber');
        if (myMobileNumber) {
            this.props.navigation.navigate('ScrAuthPassLogin',{mobileNumber : myMobileNumber})
        }
    }
//------------------------------------------------------------------------------------------

    _onNextClick = (value) => {
        
        // Check số điện thoại đã đăng ký tài khoản chưa
        api.authCheckMobile({mobileNumber:value},res => {
            console.log(res)
            // 1. Đã đăng ký, chuyển đến from đăng nhập
            if (res) {
                this.props.navigation.navigate('ScrAuthPassLogin',{mobileNumber : value})
                
            // 2. Chưa đăng ký, chuyển đến from đăng ký
            } else {
                this.props.navigation.navigate('ScrAuthPassRegister',{mobileNumber : value})
                // this.props.navigation.navigate('ScrAuthOTP',{mobileNumber : value})
            }
        })
        
    }

//------------------------------------------------------------------------------------------

    render() {
        return (
        <View style = {style.root}>
        
            <KeyboardAvoidingView behavior = "position">
                <View style = {style.body}>
                    <PopupAuth
                        imgLogo = {logoSpay} 
                        txtDescription = 'Nhập số điện thoại để tiếp tục'
                        // txtNotification = 'Lần đầu tiên 0973651368 truy cập SPAY'
                        // txtHyperlink1 = 'Đổi số điện thoại'
                        txtButon = 'TIẾP TỤC'
                        enumInputType = 'NUMBER'
                        autoFocus = {false}
                        onAction = {this._onNextClick}
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

export default connect()(scrAuthMobile)

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
        height: 36,
        resizeMode: 'contain'
    },
  }
)
