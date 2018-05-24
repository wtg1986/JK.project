import React, { Component } from 'react';
import { View,Text, StyleSheet,Image, Alert, NetInfo } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SecureStore, AppLoading, Asset, } from 'expo';
import { color } from '../utils/theme';
import { logoSpay,logoVTC } from '../../assets';
import * as api from '../utils/api';

import {  BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator, } from 'react-native-indicators';

export class scrLoading extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoadingComplete: false,
        }
    }

    componentWillMount = () => {
        NetInfo.addEventListener(
            'connectionChange',
            (connectionInfo) => {
                // connectionInfo.type
                // connectionInfo.effectiveType
                if (connectionInfo.type === 'none') {
                    Alert.alert('THÔNG BÁO','Kiểm tra lại kết nối mạng của bạn')
                }
            }
        );
    }

    componentDidMount = () => {
        this._checkMobileNumber()
    }
    
    _checkMobileNumber = async() =>{
        //Lấy số điện thoại trong SecureStore.
       
        let myMobileNumber = await SecureStore.getItemAsync('myMobileNumber');
        // console.log(myMobileNumber)
        // let myPassword = await SecureStore.getItemAsync('myPassword');
 
    
        //Nếu có số điện thoại, kiểm tra sự tồn tại.
        if (myMobileNumber) {
            api.authCheckMobile({mobileNumber:myMobileNumber},async (res) =>{
                // console.log(res)
                !res && await SecureStore.deleteItemAsync('myMobileNumber');
            })
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
          Asset.loadAsync([
            require ('../../assets/pngs/logoSpay.png'),
            require ('../../assets/pngs/logoVTC.png'),
            require ('../../assets/pngs/imgKNB.png'),
            require ('../../assets/pngs/imgATM.png'),
            require ('../../assets/pngs/imgVisa.png'),
            require ('../../assets/pngs/imgDaiLy.png'),
            require ('../../assets/pngs/imgGiftBox.png'),
            require ('../../assets/pngs/imgBarCode.png'),
            require ('../../assets/pngs/imgQrPAY.png')
          ]),
        //   Font.loadAsync({
        //     // This is the font that we are using for our tab bar
        //     ...Ionicons.font,
        //     // We include SpaceMono because we use it in HomeScreen.js. Feel free
        //     // to remove this if you are not using it in your app
        //     'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        //   }),
        ]);
    }

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    }

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
        setTimeout(() => { 
            this.props.navigation.navigate('Auth')//,{title: 'WHATEVER'}) 
        }, 1000);
    };


    render() {
        if (!this.state.isLoadingComplete)
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            )

        return (
            <View style = {scrLoadingStyle.root}>
                <View style = {scrLoadingStyle.body}>
                    <Image 
                        style={scrLoadingStyle.imgLogoSpay} 
                        source={logoSpay}
                    />
                    <Text style = {scrLoadingStyle.textLogoSpay} > AN TOÀN - TIỆN DỤNG </Text>
                    
                    <View style = {{marginTop:50}}>
                        <PacmanIndicator color = {color.primary} ></PacmanIndicator>
                    </View>
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
    imgLogoSpay :{
        alignSelf: 'center',
        height: 100,
        resizeMode: 'contain'
    },
    textLogoSpay :{
        alignSelf: 'center',
        color: color.textDark,
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 20,
    }
}
)

const mapStateToProps = (state) => {
    return { 
        isLoading: state.isLoading,
      }
}

// const mapDispatchToProps = {
  
// };

export default connect(mapStateToProps)(scrLoading)
// export default scrLoading
