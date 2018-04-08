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

export default class scrAuthMobile extends Component {
    constructor(props) {
        super(props);
        this.state = { txtMobile: 'Nhập vào số điện thoại' };
        }
  render() {
    return (
      <View style = {scrLoadingStyle.root}>
            <View style = {scrLoadingStyle.body}>
                <PopupAuth
                    imgLogo = {logoSpay} 
                    txtNotification = 'Nhập số điện thoại để tiếp tục'
                    txtButon = 'TIẾP TỤC'
                    enumInputType = 'NUMBER'
                    autoFocus = {true}
                    onAction = {(value)=>{
                        this.props.navigation.navigate('ScrAuthPass',{mobileNumber : value})
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
