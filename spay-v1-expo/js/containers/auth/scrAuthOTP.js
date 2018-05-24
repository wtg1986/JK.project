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


export class scrAuthOTP extends Component {

//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
    }

    // componentWillMount = async() => {
    //     let myMobileNumber = await SecureStore.getItemAsync('myMobileNumber');
    //     if (myMobileNumber) {
    //         this.props.navigation.navigate('ScrAuthPassLogin',{mobileNumber : myMobileNumber})
    //     }
    // }
//------------------------------------------------------------------------------------------

    _onNextClick = (value) => {
        
        this.props.dispatch({
            type: 'UPDATE_LOADING_STATE',
            value: {isLoading: true}
        })

        //Confirm OTP
        api.accountOTPConfirm({
            mobileNumber: this.props.navigation.state.params.mobileNumber,
            otpId: this.props.navigation.state.params.otpId,
            otpCode: value
        },value => {
            console.log(value)
            
            if (value.success) {
                                    
                // Lưu AccessToken và MobileNumber
                SecureStore.setItemAsync('myMobileNumber', this.props.navigation.state.params.mobileNumber);
                
                // Cập nhật store Redux
                this.props.dispatch({
                    type: 'UPDATE_ACCESS_TOKEN',
                    value: {accessToken: value.accessToken}
                })
                
                // Gọi API lấy thông tin tài khoản.
                api.accountGetProfile({accountID:'09'},value.accessToken, value => {
                    console.log(value)
                    if (!value.success) {
                        return Alert.alert('THÔNG BÁO',value.message)
                    }

                    // Cập nhật store Redux
                    this.props.dispatch({
                        type: 'UPDATE_ACC',
                        value: {
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
                        }
                    });
                    
                    this.props.dispatch({
                        type: 'UPDATE_LOADING_STATE',
                        value: {isLoading: false}
                    })

                    this.props.navigation.navigate('ScrAuthResult',{mobileNumber: value.data.mobileNumber})
                })
                
            } else {

                this.props.dispatch({
                    type: 'UPDATE_LOADING_STATE',
                    value: {isLoading: false}
                })

                Alert.alert('THÔNG BÁO',value.message)
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
                        // txtDescription = 'Nhập số điện thoại để tiếp tục'
                        txtNotification = {<Text>Nhập mã xác thực số điện thoại <Text style ={{fontWeight:'bold',color:color.primary}}>
                                                {this.props.navigation.state.params.mobileNumber}
                                            </Text>. Hiệu lực 3 phút</Text>} 
                        txtHyperlink1 = 'Đổi số điện thoại'
                        txtButon = 'TIẾP TỤC'
                        enumInputType = 'PIN_CODE'
                        onAction = {this._onNextClick}
                        onBack = {() => {
                            this.props.navigation.navigate('ScrAuthMobile')
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

export default connect()(scrAuthOTP)

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
