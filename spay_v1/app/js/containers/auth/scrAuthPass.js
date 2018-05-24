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

import PopupAuth from '../../components/popupAuth'
import {color} from '../../utils/theme';
import {logoSpay,logoVTC} from '../../../assets';
import {connect } from 'react-redux';
import * as api from '../../utils/api';

export class scrAuthPass extends Component {

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
                        txtNotification = {<Text>Xin chào <Text style ={{fontWeight:'bold',color:color.primary}}>
                                                {this.props.navigation.state.params.mobileNumber}
                                            </Text></Text>} 
                        txtDescription = 'Nhập mật khẩu để đăng nhập'
                        txtHyperlink1 = 'Đối số điện thoại'
                        txtButon = 'TIẾP TỤC'
                        enumInputType = 'PASS'
                        autoFocus = {true}
                        onAction = {(value)=>{
                            api.accountLogin({
                                accountId : this.props.navigation.state.params.mobileNumber,
                                password : value
                            },(value) =>{ 
                                
                                if (value.error===2)
                                    alert ('Tài khoản không tồn tại hoặc nhập sai mật khẩu')
                                else 
                                {
                                    if (value.error===0)
                                        {
                                            console.log(value.data)
                                            this.props.dispatch({
                                                type: 'UPDATE_ACC',
                                                value: {
                                                accountId : value.data.accountId,
                                                mobileNumber : value.data.mobileNumber,
                                                pushToken : value.data.pushToken,
                                                newNotiCount : value.data.newNotiCount,
                                                latitude : value.data.latitude,
                                                longitude : value.data.longitude,
                                                refCode : value.data.refCode,
                                                cashBackPoint : value.data.cashBackPoint,
                                                balance : value.data.balance,
                                                avataUrl : value.data.avataUrl,
                                                address : value.data.address,
                                                username : value.data.username,
                                                passport : value.data.passport,
                                                email : value.data.email,
                                                accountType: value.data.accountType,
                                                }
                                            });
                                            
                                            this.props.navigation.navigate('Main')
                                        }
                                    else 
                                        alert('Lỗi hệ thống')
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
    accountId: state.accountId,
  }
}

export default connect(mapStateToProps)(scrAuthPass)

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
      height: 30,
      resizeMode: 'contain'
    },
  }
)
