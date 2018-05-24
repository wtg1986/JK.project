import {StyleSheet, Text, View, Image} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../utils/theme';
import {serverResource} from '../utils/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/button';


export default class elementAgency extends Component {

    static propTypes = {
        userName : PropTypes.string,
        mobileNumber : PropTypes.string,
        avataUrl : PropTypes.string,
        address : PropTypes.string,
        distance : PropTypes.string,
        dynamicPoint : PropTypes.number,
    };    

    static defaultProps = {
        userName : 'Kenny Trần',
        mobileNumber : '0973651368',
        avataUrl : '/resources/images/avatas/avata_0973651368.jpg',
        address : '106/41 Phố Vọng, Hai Bà Trưng, Hà Nội',
        distance : ' 1,5km',
        dynamicPoint : 17,
    }

    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    _renderUserInfo = () => {
        return (
            <View style = {style.groupUserInfo}>
                <View style = {{flexDirection: 'row', alignItems: 'center',}}>
                    <Image style = {style.avata} source = {{uri: serverResource + this.props.avataUrl}} />               
                    <Text style ={style.userNameText}> {this.props.userName} </Text>
                </View>
                <Text style ={style.mobileNumberText}>{this.props.mobileNumber}</Text>
            </View>
        )
    }

    _renderAddress = () => {
        return (
            <View style = {style.groupAddress}>
                <Text style ={style.addressText}> {this.props.address}</Text>
                <View style = {{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',}}>
                    <Icon name = 'motorbike' size = {22} color = {color.textGray} /> 
                    <Text style ={style.distanceText}>{this.props.distance}</Text>
                </View>
            </View>
        )
    }

    
    render() {
        return (
            <View style = {style.root}>
                {/* Avata - UserName - mobileNumber */}
                {this._renderUserInfo()}

                {/* Address - Distance */}
                {this._renderAddress()}

                {/* DynamicPoint - MessageButton - CallButton */}
                <View style = {{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center',}}>
                    <View style ={style.groupDynamicPoint}> 
                        <Icon name = 'star-circle' size = {21} color = {color.textGray} /> 
                        <Text style ={style.dynamicPointText}>
                            {`${this.props.dynamicPoint} điểm năng động`}
                        </Text>
                    </View>

                    <View style ={{flexDirection: 'row',}}>
                        <Button 
                            height = {42} width = {42}
                            backgroundColor = {color.third}
                            icon = {<Icon name = 'facebook-messenger' size = {30} color = {color.white} />}
                            text = ''
                        />
                        <View style ={{marginHorizontal: 10,}}/>
                        <Button 
                            height = {42} width = {42}
                            backgroundColor = {color.secondary}
                            icon = {<Icon name = 'phone-in-talk' size = {30} color = {color.white} />}
                            text = ''
                        />
                    </View>
                </View>
            </View>
        )
    };
};
      
const style = StyleSheet.create({
    root : {
        // flex : 1,
        backgroundColor : color.box,
        padding: 10,
        justifyContent :'flex-start',
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .4,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    groupUserInfo : {
        flexDirection: 'row',
        justifyContent:'space-between', 
        alignItems: 'center',
        marginBottom: 10,
    },
    avata : {
        height:38,
        width:38,
        borderRadius: 19,
        marginRight: 7,
    },
    userNameText : {
        color: color.textDark,
        fontSize: 17,
    },
    mobileNumberText : {
        color: color.textGray,
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    groupAddress :{
        flexDirection: 'row',
        justifyContent:'space-between', 
        marginBottom: 10,
        // backgroundColor: color.shadow
    },
    addressText : {
        flex:1,
        color: color.textGray,
        fontSize: 15,
        fontStyle: 'italic',
        marginRight: 10,
    },
    distanceText: {
        color: color.primary,
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    groupDynamicPoint: {
        flexDirection: 'row',
        borderRadius: 13, 
        borderWidth: 1, 
        borderColor: color.shadow,
        alignItems: 'center',
        padding: 2
    },
    dynamicPointText: {
        color : color.primary,
        fontSize : 15,
        marginHorizontal: 5,
    }


})