import React, { Component } from 'react';
import { 
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput
 } from 'react-native';
 
import PropTypes from 'prop-types';
import PopupAuth from '../../components/popupAuth'
import {color} from '../../utils/theme';
import {logoSpay,logoVTC} from '../../../assets';
import * as api from '../../utils/api';
import { connect } from 'react-redux';
import {Location,Permissions,Notifications} from 'expo';

// let newState = {}

export class scrAuthPass extends Component {
    constructor(props) {
      super(props);
      // this.state = { txtMobile: 'Nhập vào số điện thoại' };
      
    }

    _watchPositionAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        // this.setState({
        //   errorMessage: 'Permission to access location was denied',
        // });
        // return;
      }
  
      let watch = await Location.watchPositionAsync({timeInterval:60000},(obj)=>{
        
        let la = obj.coords.latitude
        let lo = obj.coords.longitude

        this.props.dispatch({
          type: 'UPDATE_LOCATION',
          value: {
            latitude : la,
            longitude : lo
          }
        })

        api.accountUpdateLocation(
          {accountId: this.props.accountId,
            latitude: la, 
            longitude: lo},)
      });
    };

  render() {
    return (
      <View style = {scrLoadingStyle.root}>
            <View style = {scrLoadingStyle.body}>
                <PopupAuth
                    imgLogo = {logoSpay} 
                    txtNotification = {<Text>Xin chào <Text style ={{fontWeight:'bold',color:color.primary}}>
                            {this.props.navigation.state.params.mobileNumber}
                        </Text>
                    </Text>} 
                    txtDescription = 'Nhập mật khẩu để đăng nhập'
                    txtButon = 'TIẾP TỤC'
                    enumInputType = 'PASS'
                    autoFocus = {true}
                    onAction = {(value)=>{

                      api.accountLogin({
                        accountId : this.props.navigation.state.params.mobileNumber,
                        password : value
                      },(value)=>{

                        if (value.error===2)
                          alert ('Tài khoản không tồn tại hoặc nhập sai mật khẩu')
                        else {
                          if (value.error===0)
                            {

                              //Cập nhật token Push
                              (async () => {
                                let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                                if (status !== 'granted') {
                                  // return;
                                }
                                // const { status: existingStatus } = await Permissions.getAsync(
                                //   Permissions.NOTIFICATIONS
                                // );

                                // let finalStatus = existingStatus;
                              
                                // if (existingStatus !== 'granted') {
                                //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                                //   finalStatus = status;
                                // }

                                
                              
                                // // Stop here if the user did not grant permissions
                                // if (finalStatus !== 'granted') {
                                //   return;
                                // }
                              
                                // Get the token that uniquely identifies this device
                                let token = await Notifications.getExpoPushTokenAsync();
                              
                                // POST the token to your backend server from where you can retrieve it to send push notifications.
                                return api.accountUpdatePushToken(
                                  {accountId: value.data.accountId,
                                  pushToken: token},)
                              })()

                              //Đăng kí cập nhật vị trí 60s 1 lần
                              this._watchPositionAsync()

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
                                }
                              });
                              
                              this.props.navigation.navigate('Main')
                            }
                          else 
                            alert('Lỗi hệ thống')
                        }
                      })
                    }}
                >
                </PopupAuth>
            </View>

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

const mapStateToProps = (state) => {
  return { 
    accountId: state.accountId,
  }
}
// const mapDispatchToProps = {
  
// };

export default connect(mapStateToProps)(scrAuthPass)

const scrLoadingStyle = StyleSheet.create(
  {
    root : {
      flex: 1,
    },
    body : {
      flex: 1,
      alignItems: 'center',
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
