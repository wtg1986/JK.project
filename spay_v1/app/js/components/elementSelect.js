
import {StyleSheet, Text, View, Image} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class elementSelect extends Component {
    static propTypes = {
        imageSize : PropTypes.object,
        title : PropTypes.string,
        description : PropTypes.string,
        tintColor : PropTypes.string,
        isSelect : PropTypes.bool
    };    
    
    constructor(props) {
        super(props);
        // this.state = { 
        // };
    }

    render() {
        return (
            <View style = {[style.root,{
                            backgroundColor : this.props.isSelect ? color.primary : color.box,
                            borderColor : this.props.isSelect ? color.primary : color.shadow,
                            }]}>
                <Image  style = {[style.image, {height : this.props.imageSize.h,width : this.props.imageSize.w,}]} 
                        source = {this.props.image}/>

                <View style = {{flex:1, justifyContent:'center',paddingHorizontal : 6}}> 
                    <Text style = {[style.title, {color: this.props.isSelect ? color.white : color.textDark}]}> {this.props.title} </Text>
                    <Text style = {[style.description, {color: this.props.isSelect ? color.white : color.textGray} ]}> {this.props.description} </Text>
                </View>
                
                <View style = {{ justifyContent : 'center', paddingHorizontal : 8 }}> 
                    <Ionicons 
                        name = 'ios-arrow-round-forward-outline'
                        size = {30} 
                        color = {this.props.isSelect ? color.white : color.textGray} > 
                    </Ionicons>
                </View>
            </View>
        )
    };
};

const style = StyleSheet.create(
    {
        root : {
            marginTop: 5,
            marginHorizontal: 15,
            padding : 3,
            flexDirection: 'row',
            justifyContent :'space-between',
            // backgroundColor : color.box,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: color.shadow,
            // shadowColor: '#929292',
            // shadowOffset: { width: 1, height: 1 },
            // shadowRadius: 3,
            // shadowOpacity: .6,
        },
        image : { 
            borderWidth : 1,
            borderRadius : 10,
            borderColor : color.shadow
        },
        title : { 
            fontSize : 16,
            fontWeight : 'bold',
            paddingBottom :3,
            // color : color.textDark
        },
        description : { 
            fontSize : 13,
            fontStyle : 'italic',
            // color : color.textGray
        }
    }
)