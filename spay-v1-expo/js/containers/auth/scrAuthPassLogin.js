import React, { Component } from 'react';
import { 
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    Modal
 } from 'react-native';

import {SecureStore} from 'expo';
import PopupAuth from '../../components/popupAuth'
import {showLoading,hideLoading} from '../../components/loadingIndicators';
import { color } from '../../utils/theme';
import { logoSpay,logoVTC } from '../../../assets';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as api from '../../utils/api';
import * as errorNum from '../../constants/ErrorNum';
import * as actions from '../../actions';

class scrAuthPassLogin extends Component {

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
                        enumInputType = 'PASS_LOGIN'
                        autoFocus = {true}
                        onAction = {async (value)=>{

                            let myPassword = (value === '') ?
                                await SecureStore.getItemAsync('myPassword') :
                                value;
                            
                            this.props.loadingIndicators(true)
                            
                            api.accountLogin({
                                mobileNumber : this.props.navigation.state.params.mobileNumber,
                                password : myPassword
                            },(value) =>{ 
                                
                                if (value.success) {
                                    
                                    // Lưu AccessToken và MobileNumber
                                    SecureStore.setItemAsync('myMobileNumber', this.props.navigation.state.params.mobileNumber);
                                    
                                    SecureStore.setItemAsync('myPassword', myPassword);
                                    // SecureStore.setItemAsync('accessToken', value.accessToken);
                                    
                                    // Cập nhật store Redux
                                    // this.props.dispatch({
                                    //     type: 'UPDATE_ACCESS_TOKEN',
                                    //     value: {accessToken: value.accessToken}
                                    // })
                                    this.props.setAccessToken(value.accessToken)
                                    
                                    // Gọi API lấy thông tin tài khoản.
                                    api.accountGetProfile({accountID:'09'},value.accessToken, value => {
                                        console.log(value)
                                        
                                        this.props.setAccountInfo({
                                            accountId : value.data.accountId,
                                            mobileNumber : value.data.mobileNumber,
                                            createTime : value.data.createTime,
                                            accountState : value.data.accountState,
                                            pushToken : value.data.pushToken,
                                            newNotiCount : value.data.newNotiCount,
                                            latitude : value.data.latitude,
                                            longitude : value.data.longitude,
                                            accountStatus : value.data.accountStatus,
                                            refCode : value.data.refCode,
                                            cashBackPoint : value.data.cashBackPoint,
                                            balance : value.data.balance,
                                            avataUrl : value.data.avataUrl,
                                            address : value.data.address,
                                            username : value.data.username,
                                            passport : value.data.passport,
                                            email : value.data.email,
                                            accountType: value.data.accountType,
                                        })

                                        // Cập nhật store Redux
                                        // this.props.dispatch({
                                        //     type: 'UPDATE_ACC',
                                        //     value: {
                                        //         accountId : value.data.accountId,
                                        //         mobileNumber : value.data.mobileNumber,
                                        //         createTime : value.data.createTime,
                                        //         accountState : value.data.accountState,
                                        //         pushToken : value.data.pushToken,
                                        //         newNotiCount : value.data.newNotiCount,
                                        //         latitude : value.data.latitude,
                                        //         longitude : value.data.longitude,
                                        //         accountStatus : value.data.accountStatus,
                                        //         refCode : value.data.refCode,
                                        //         cashBackPoint : value.data.cashBackPoint,
                                        //         balance : value.data.balance,
                                        //         avataUrl : value.data.avataUrl,
                                        //         address : value.data.address,
                                        //         username : value.data.username,
                                        //         passport : value.data.passport,
                                        //         email : value.data.email,
                                        //         accountType: value.data.accountType,
                                        //     }
                                        // });
                                        
                                        this.props.loadingIndicators(false)
                                        this.props.navigation.navigate('Main')
                                    })
                                    
                                } else {
                                    this.props.loadingIndicators(false)
                                    Alert.alert('THÔNG BÁO',value.message)
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

// const mapStateToProps = (state) => {
//     return { 
//         isLoading: state.isLoading
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        loadingIndicators: (value) => { dispatch(actions.loadingIndicators(value)) },
        setAccessToken: (value) => { dispatch(actions.setAccessToken(value)) },
        setAccountInfo: (value) => { dispatch(actions.setAccountInfo(value)) }
    }
};


export default connect(null,mapDispatchToProps)(scrAuthPassLogin)

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


