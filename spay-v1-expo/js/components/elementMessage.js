import {
    StyleSheet, 
    Text, 
    View, 
    Image,
    Dimensions
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../utils/theme';
import {serverResource} from '../utils/global';

const { width: wWidth } = Dimensions.get('window');

export default class elementMessage extends Component {

    static propTypes = {
        isMe : PropTypes.bool,
        userName : PropTypes.string,
        mobileNumber : PropTypes.string,
        avataUrl : PropTypes.string,
        accountId : PropTypes.string,
        message : PropTypes.string,
        time : PropTypes.string,
    };    

    // static defaultProps = {
    //     isMe : false,
    //     accountId : '0973651368',
    //     userName : 'Kenny Trần',
    //     mobileNumber : '0973651368',
    //     avataUrl : '/resources/images/avatas/avata_0973651368.jpg',
    //     message : '106/41 Phố Vọng, Hai Bà Trưng, Hà Nội',
    //     time : '15p'
    // }

    constructor(props) {
        super(props);
        this.state = { 
            widthMessage: undefined
        };
    }

    _renderMessage = () => {
        
        let {isMe, avataUrl,accountId, mobileNumber, message, time} = this.props
        
        return (
            <View style ={{alignItems: !isMe ? 'flex-start':'flex-end',}}>

                {/* Group hiển thị message */}
                <View  style ={[style.groupMessage, 
                                {
                                    width : this.state.widthMessage,
                                    borderTopLeftRadius: isMe ? 10 :21,
                                    borderTopRightRadius: isMe ? 21 : 10,
                                    backgroundColor : isMe ? color.third : color.white,
                                }]}
                    onLayout = {(event) => {
                        let wm = (event.nativeEvent.layout.width > wWidth - 70) ? wWidth - 70 : event.nativeEvent.layout.width
                        this.setState(oldState => {return({...oldState,widthMessage: wm})})
                    }}>

                        {/* Hiển thị avata - số điện thoại - thời gian */}
                        {!isMe &&
                        <View style = {{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between',}}>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Image style = {style.avata} source = {{uri: serverResource + avataUrl}} /> 
                                <Text style ={style.userNameText}> {mobileNumber} </Text>
                            </View>
                        </View>}

                        {/* Hiển thị message */}
                        <Text style = {[style.messageText,{color : isMe ? color.white : color.textDark}]}>
                            {message}
                        </Text>

                        {/* Hiển thị thời gian */}
                        <View style = {{flexDirection:'row', justifyContent: 'flex-end',marginTop:8}}>
                            <Text style ={[style.timeText,{color: isMe ? color.white : color.textGray}]}> {'   ' + time} </Text>
                        </View>
                
                </View>

            </View>
        )
    }
    
    render() {
        return this._renderMessage()
    };
};
      
const style = StyleSheet.create({
    groupMessage : {
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .30,
        paddingTop: 2,
        paddingLeft: 2,
        paddingRight: 10,
        paddingBottom: 10,
        marginVertical: 5,
    },
    messageText : {
        fontSize: 17,
        marginHorizontal: 10,
        marginTop: 7,
    },
    avata : {
        height:38,
        width:38,
        borderRadius: 19,
        marginRight: 7,
    },
    userNameText : {
        color: color.textDark,
        fontWeight: 'bold',
        fontSize: 17,
    },
    timeText : {
        fontStyle : 'italic',
        fontSize: 11,
        opacity : .8
    }
})