import React, { Component } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import { color } from '../ultis/theme';

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
        setTimeout(() => { this.props.navigation.navigate('Auth') }, 2000);
    }

    render() {
    return (
    <View style = {scrLoadingStyle.root}>
        <View style = {scrLoadingStyle.body}>
            <Image 
                style={scrLoadingStyle.imgLogoSpay} 
                source={require('../../assets/logos/logoSpay.png')}
            />
            <Text style = {scrLoadingStyle.textLogoSpay} > AN TOÀN - TIỆN DỤNG </Text>
            <View style = {{marginTop:50}}>
                <PacmanIndicator color = {color.primary} ></PacmanIndicator>
            </View>
        </View>
        
        <View style = {scrLoadingStyle.bottom}>
            <Image 
                style={scrLoadingStyle.imgLogoVTC} 
                source={require('../../assets/logos/logoVTC.png')}
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
