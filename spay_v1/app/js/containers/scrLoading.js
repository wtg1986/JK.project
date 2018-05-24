

import React, { Component } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import * as firebase from 'firebase';

import { color } from '../utils/theme';
import {logoSpay,logoVTC} from '../../assets';

import {  BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator, } from 'react-native-indicators';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBfbVUoW3PIPT79EvcGl4kFU5Otcgdi-z0",
    authDomain: "spay-v1.firebaseapp.com",
    databaseURL: "https://spay-v1.firebaseio.com",
    projectId: "spay-v1",
    storageBucket: "spay-v1.appspot.com",
    messagingSenderId: "298093479886"
  };

export class scrLoading extends Component {

    constructor(props) {
        super(props);
        
        setTimeout(() => { 
            firebase.auth().signInWithPhoneNumber('+84973651368', appVerifier)
            .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            }).catch(function (error) {
            // Error; SMS not sent
            // ...
            });
            
            // this.props.navigation.navigate('Auth') 
        }, 2000);
    }

    componentDidMount(){
        firebase.initializeApp(firebaseConfig);
        console.log('init')
    }
    

    render() {
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
        height: 50,
        resizeMode: 'contain'
    },
    imgLogoSpay :{
        alignSelf: 'center',
        height: 160,
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

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrLoading
