import React, { Component } from 'react';
import {
    View,
    Alert, 
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { serverPush } from '../utils/global';
import * as api from '../utils/api';
import * as actions from '../actions';
import io from 'socket.io-client/dist/socket.io';
import { color } from '../utils/theme'; 

export class socketio {
    static instance = null;
    static getInstance() {
        if (socketio.instance === null) {
            socketio.instance = new socketio();
        }
        return socketio.instance;
    }
    
    constructor() {
        this.socket = io(serverPush,{jsonp:false});
    }

    setEvent = (event,func) => {
        return func && this.socket.on(event,func) 
    }

    removeEvent = (event) => {
        return this.socket.off(event) 
    }

    emit = (event, data) => {
        return this.socket.emit(event,data)
    }
}

class stateio extends Component {
    
    constructor(props) {
        super(props);
    }
//------------------------------------------------------------------------------------------
    
    
    componentDidMount = ()=> {
        this.socket = socketio.getInstance();
        this.socket.setEvent('onAccessToken',this._onAccessToken) 
        this.socket.setEvent('onRefCodeActive',this._onRefCodeActive) 
        this.socket.setEvent('onChatMessage',this._onChatMessage) 
    }

    
//------------------------------------------------------------------------------------------
    _onAccessToken = (data)=>{
        // console.log(data);
        // Nhận được sự kiện yêu cầu xác thực accesToken
        this.socket.emit('onAccessToken',{accessToken: this.props.accessToken}) // Bảo mật chỗ này
    }
//------------------------------------------------------------------------------------------
    _onRefCodeActive = (data)=>{
        let {accountId, balance} = data
        this.props.setBalance(balance)
        this.props.showToastMessage({
            toastMessage : 
            <Text>Bạn đã mời sđt: <Text style = {{color:color.primary}}>{accountId}</Text> sử dụng Ví Spay. Bạn được thưởng <Text style = {{color:color.primary}}>2,000đ.</Text></Text>,
            toastIcon : 'slideshare',
            toastIconColor : color.secondary,
        },2500)
    }
//------------------------------------------------------------------------------------------
    _onChatMessage = (data)=>{
        let {mobileNumber, message} = data
        this.props.showToastMessage({
            toastMessage : 
            <Text>SĐT: <Text style = {{color:color.primary}}>{mobileNumber}</Text> đã nhắn tin cho bạn.</Text>,
            toastIcon : 'chat',
            toastIconColor : color.secondary,
        },2500)
    }
//------------------------------------------------------------------------------------------
    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.children}
            </View>
        )
    };
};

//------------------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    return {
        accountId: state.accountId,
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showToastMessage: (value, duration) => { dispatch(actions.showToastMessage(value, duration)) },
        setBalance: (value) => { dispatch(actions.setBalance(value)) },
        newMessage: (value) => { dispatch(actions.newMessage(value)) }
    }
};

//------------------------------------------------------------------------------------------

export default connect(mapStateToProps,mapDispatchToProps)(stateio)

