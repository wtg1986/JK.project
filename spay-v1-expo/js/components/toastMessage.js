import {
    StyleSheet, 
    Animated, 
    Text, 
    Easing,
    View,
    Dimensions
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { color } from '../utils/theme';
const { width: wWidth } = Dimensions.get('window');

export default class toastMessage extends Component {
   
    static defaultProps = {
        toastTop : new Animated.Value(22),
        toastMessage : 'Test hiển thị toast',
        toastIcon : 'info-with-circle',
        toastIconColor : color.secondary,
    }  

    constructor(props) {
        super(props);
    }
    
    render() {
        let {toastIsShow,toastTop, toastIcon, toastIconColor, toastMessage} = this.props
        
        return (toastIsShow &&
            <Animated.View style = {[style.popup,{ top: this.props.toastTop }]}>
                
                { toastIcon && 
                <View style = {{paddingLeft: 5,paddingRight: 15,}}> 
                    <Icon 
                        name = {toastIcon} size = {26} color = {toastIconColor}> 
                    </Icon>
                </View>}

                <Text style = {style.message}>
                    {toastMessage}
                </Text>

            </Animated.View>
        )
    };
};

const style = StyleSheet.create({
    popup : {
        height: 52,
        width: wWidth-46,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor : color.white,
        paddingVertical: 8,
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 6,
        position: 'absolute',
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 3.3,
        shadowOpacity: .50,
        opacity:.92
    },
    message : {
        color : color.textDark,
        flex: 1
    }
})