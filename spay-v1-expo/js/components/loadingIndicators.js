import {StyleSheet, View, Modal, Keyboard} from 'react-native';
import React, { Component } from 'react';
import { color } from '../utils/theme';
import { SkypeIndicator } from 'react-native-indicators';

export default class loadingIndicators extends Component {
    
    constructor(props) {
        super(props);
    }

    // componentWillMount = () => {
    //     Keyboard.dismiss()
    // }

    render() {
        return (
            <Modal transparent = {true} visible={this.props.isLoading} >
                <View style = {style.root}>
                    <View style = {style.popup}>
                        <SkypeIndicator color = {color.primary} ></SkypeIndicator>
                    </View>       
                </View>
            </Modal> 
        )
    };
};

const style = StyleSheet.create({
    root : {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,.2)'
    },
    popup : {
        width : 64,
        height : 64,
        backgroundColor : color.white,
        justifyContent : 'center',
        borderRadius: 10,
    }
})