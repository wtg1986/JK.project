import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { Notifications, Permissions } from 'expo';
import * as api from '../utils/api';

export class statePushNotification extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errorMessage:null,
            pushToken:null
        }
    }

//Đăng ký Token Push notification
//------------------------------------------------------------------------------------------

    _registerPushToken = async () => {
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (status !== 'granted') {
            this.setState(oldState => {return({
                ...oldState, errorMessage: 'Permission to access push notification was denied',
            })})
        }

        let token = await Notifications.getExpoPushTokenAsync();

        this.setState(oldState => {return({...oldState, pushToken: token })});

        api.accountUpdatePushToken(
            {accountId: this.props.accountId, pushToken: token},
        )
    }

//Chạy trước khi Render
//------------------------------------------------------------------------------------------

    componentWillMount() 
    {
       
    }

//Chạy sau khi Render
//------------------------------------------------------------------------------------------

    componentDidMount() 
    {
        this._registerPushToken();
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

export default connect(mapStateToProps)(statePushNotification)

