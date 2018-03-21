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
import {color} from '../../ultis/theme';

export default class scrLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { txtMobile: 'Nhập vào số điện thoại' };
        }
  render() {
    return (
      <View style = {scrLoadingStyle.root}>
            <View style = {scrLoadingStyle.body}>
                <PopupAuth
                    imgLogo = {require('../../../assets/logos/logoSpay.png')} 
                    txtNotification = 'Nhập số điện thoại để tiếp tục'
                    txtButon = 'TIẾP TỤC'
                    enumInputType = 'TEXT'
                    autoFocus = {true}
                    onAction = {()=>{
                        this.props.navigation.navigate('Main')
                    }}
                >
                </PopupAuth>
            </View>

          <View style = {scrLoadingStyle.bottom}>
            <Image 
                style={scrLoadingStyle.imgLogoVTC} 
                source={require('../../../assets/logos/logoVTC.png')}
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
