
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class buttonGroupFeature extends Component {
    static propTypes = {
        iconLabel : PropTypes.array.isRequired,
        iconLabelColor : PropTypes.string,
        badgeColor : PropTypes.object,
        badgeBagCount : PropTypes.number,
        onPress : PropTypes.array,
    };    
    constructor(props) {
        super(props);
        // this.state = {
        //     badgeBag : this.props.badgeBagCount ? this.props.badgeBagCount : 0
        // }
    }
    
    render() {

        const {iconLabel,iconLabelColor,badgeColor,onPress} = this.props;

        return (
            <View style={style.root}>
                {
                    iconLabel.map((oj,i)=> {
                    
                    // Chú ý chỗ này, dấu ngoặc xuống dòng là ko hiện luôn!
                    return (  
                        <View key ={i}>    
                            {/* Touch button */}
                            <TouchableOpacity style = {style.button}
                                onPress = {onPress[i]}
                            >

                            {/* Icon Button */}
                                <Icon 
                                    style ={{textAlign:'center'}} 
                                    name = {oj.icon} size={40} color={iconLabelColor} > 
                                </Icon>
                                
                            {/* Text Button */}
                                <Text style = {{color: iconLabelColor, marginTop:5}} >
                                    {oj.label}
                                </Text>

                            </TouchableOpacity>

                            {/* Badge notif */}
                            {
                                (this.props.badgeBagCount !==0 && i === this.props.iconLabel.length - 1)?
                                <View style = {[style.badge,{backgroundColor : badgeColor.background}]}>
                                    <Text style = {{fontSize:14, fontWeight:'bold', color: badgeColor.text}}>
                                        {` ${this.props.badgeBagCount} `} 
                                    </Text>
                                </View> : null
                            }
                    </View>)
                    })
                }
            </View>
        )
    };
};

const style = StyleSheet.create(
    {
        root : {
            flex : 1,
            flexDirection : 'row',
            height: 84,
            top: 118 + 28,
            left: 0, 
            right: 0,
            position: 'absolute',
            justifyContent : 'space-around'
        },

        button : {
            backgroundColor : color.box,
            height : 80,
            width : 64,
            borderRadius : 10,
            justifyContent : 'center',
            alignItems: 'center',
            shadowColor: '#929292',
            shadowOffset: { width: .6, height: .6 },
            shadowRadius: 2.5,
            shadowOpacity: .4,
        },

        badge : {
            borderRadius : 10,
            right: 0,
            position: 'absolute',
            padding: 2,
        }

    }
  )