
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class buttonGroupFuntion extends Component {
    static propTypes = {
        iconLabel : PropTypes.array.isRequired,
        iconColor : PropTypes.array.isRequired,
        badge : PropTypes.object,
        badgeColor : PropTypes.object,
        onPress : PropTypes.array,
    };    
    constructor(props) {
        super(props);
    }
    
    render() {

        const {iconLabel, iconLabelColor, badge, badgeColor,onPress} = this.props;

        return (
            <View style={style.root}>
              {
                iconLabel.map((oj,i)=> {
                  let x = i%3
                  let y = Math.floor(i/3)

                  let icon = () => {
                    switch (oj.family) {
                      case 'Entypo':
                          return <Entypo 
                                    style ={{textAlign:'center'}} 
                                    name = {oj.icon} 
                                    size= {40} 
                                    color={this.props.iconColor[i]} > 
                                </Entypo>
                        break;
                      case 'MaterialCommunityIcons':
                          return <MaterialCommunityIcons 
                                    style ={{textAlign:'center'}} 
                                    name = {oj.icon} 
                                    size= {40} 
                                    color={this.props.iconColor[i]} > 
                                </MaterialCommunityIcons>
                        break;
                      case 'FontAwesome':
                          return <FontAwesome 
                                  style ={{textAlign:'center'}} 
                                  name = {oj.icon} 
                                  size= {40} 
                                  color={this.props.iconColor[i]} > 
                              </FontAwesome>
                        break;
                      return null
                    }
                  }

                  return (<TouchableOpacity 
                            key = {i} 
                            style = {[style.button , {left:x*110,top:y*100 }]}
                            onPress = {onPress ? onPress[i] : null}
                          >  

                          {/* Icon Button */}
                          {icon()}
                                    
                          {/* Text Button */}
                          <Text style = {[style.label,{color:color.textGray}]} >
                              {oj.label}
                          </Text>
                  </TouchableOpacity>)
                })
              }
            </View>
        )
    };
};

const style = StyleSheet.create(
    {
        root : {
            height : 300,
            width : 300,
            marginTop: 20,
            alignSelf: 'center',
            // backgroundColor:'red'
        },

        button : {
            // backgroundColor :'#E4E8EA',
            height : 80,
            width : 80,
            position: 'absolute',
            justifyContent : 'flex-start',
            alignItems: 'center',
            borderRadius: 10,
        },

        label : {
            marginTop: 3,
            fontSize: 13,
            width : 80,
            textAlign : 'center',
        },

        badge : {
            borderRadius : 10,
            right: 0,
            position: 'absolute',
            // padding: 2,
        }

    }
  )