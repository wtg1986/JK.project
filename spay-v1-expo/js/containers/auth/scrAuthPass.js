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

export default class scrAuthPass extends Component {
    constructor(props) {
      super(props);
      // this.state = { txtMobile: 'Nhập vào số điện thoại' };
    }

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
                        // Check Pass....
                        this.props.navigation.navigate('Main')
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
