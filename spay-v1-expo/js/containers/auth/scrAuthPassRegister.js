import React, { Component } from 'react';
import { 
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView
 } from 'react-native';

import PopupAuth from '../../components/popupAuth'
import { color } from '../../utils/theme';
import { logoSpay,logoVTC } from '../../../assets';
import { connect } from 'react-redux';
import * as api from '../../utils/api';

export class scrAuthPassRegister extends Component {

    constructor(props) {
        super(props);
    }

//------------------------------------------------------------------------------------------

    render() {
        return (
        <View style = {scrLoadingStyle.root}>

            <KeyboardAvoidingView behavior = "position">
        
                <View style = {scrLoadingStyle.body}>

                    <PopupAuth
                        imgLogo = {logoSpay} 
                        txtNotification = {<Text>Lần đầu tiên <Text style ={{fontWeight:'bold',color:color.primary}}>
                                                {this.props.navigation.state.params.mobileNumber}
                                            </Text> truy cập SPAY</Text>} 
                        txtDescription = 'Nhập mật khẩu để đăng ký'
                        txtHyperlink1 = 'Đối số điện thoại'
                        txtButon = 'TIẾP TỤC'
                        enumInputType = 'PASS_REGISTER'
                        autoFocus = {true}
                        onAction = {(value)=>{
                            
                            this.props.dispatch({
                                type: 'UPDATE_LOADING_STATE',
                                value: {isLoading: true}
                            })

                            api.accountRegister({
                                mobileNumber : this.props.navigation.state.params.mobileNumber,
                                password : value
                            },(value) =>{ 
                                if (value.success){
                                    
                                    this.props.dispatch({
                                        type: 'UPDATE_LOADING_STATE',
                                        value: {isLoading: false}
                                    })

                                    this.props.navigation.navigate('ScrAuthOTP',{
                                        mobileNumber : this.props.navigation.state.params.mobileNumber,
                                        otpId : value.otpId,
                                        otpType : value.otpType
                                    })
                                }
                            })

                        }}
                        onBack = {() => {
                            this.props.navigation.goBack()
                        }}
                    />
                    
                </View>

            </KeyboardAvoidingView>
                
            <View style = {scrLoadingStyle.bottom}>
                <Image 
                    style={scrLoadingStyle.imgLogoVTC} 
                    source={logoVTC}
                />
            </View>
        </View>
        )
    }
};

//------------------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    return { 
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(scrAuthPassRegister)

//------------------------------------------------------------------------------------------
const scrLoadingStyle = StyleSheet.create(
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
