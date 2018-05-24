import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import * as api from '../utils/api';
import {serverPush} from '../utils/global';
import io from 'socket.io-client/dist/socket.io';

export class stateio extends Component {
    
    constructor(props) {
        super(props);
        this.socket = io(serverPush,{jsonp:false});
        this._setEventSocket()
    }

//------------------------------------------------------------------------------------------
    _setEventSocket = () =>{
        this.socket.on('onTranferMoney',this._onTranferMoney) 
    }

//------------------------------------------------------------------------------------------
    _onTranferMoney = (data)=>{
        let {accountId,amount} = data

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
    }
}

//------------------------------------------------------------------------------------------

export default connect(mapStateToProps)(io)

