
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';

export default class button extends Component {
    static propTypes = {
        fontSize : PropTypes.number, 
        text : PropTypes.string,
        height : PropTypes.number,
        width : PropTypes.number,
        backgroundColor : PropTypes.string,
        textColor : PropTypes.string,
        icon : PropTypes.object,
        shadow : PropTypes.bool,
        onPress : PropTypes.func,
        top : PropTypes.number,
        left : PropTypes.number
    }; 

    static defaultProps = {
        fontSize : 15,
        text : 'TOUCH',
        height : 32,
        width : 64,
        backgroundColor : color.primary,
        textColor : color.white,
        shadow : true
    }   

    constructor(props) {
        super(props);
        // this.state = { 
        // };
    }

    render() {
        let {text,height,width,backgroundColor,textColor,fontSize,top,left} = this.props;
        return (
            <TouchableOpacity onPress = {(e)=>{this.props.onPress(e)}} >
                <View style = {[style.root,{
                    height: height,
                    backgroundColor: backgroundColor,
                    position : (top||left) ? 'absolute' : 'relative',
                    top : top ? top : null,
                    left: left ? left : null,
                }]}>
                    <Text style = {{color:textColor,fontSize:fontSize}}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };
};

const style = StyleSheet.create(
    {
        root : {
            paddingHorizontal: 10,
            margin : 3,
            marginHorizontal: 10,
            justifyContent :'center',
            alignItems: 'center',
            borderRadius: 10,
            shadowColor: '#929292',
            shadowOffset: { width: 1, height: 1 },
            shadowRadius: 3,
            shadowOpacity: .6,
        },
    }
)