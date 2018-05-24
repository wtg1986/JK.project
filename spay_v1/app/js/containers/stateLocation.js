import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { Location, Permissions } from 'expo';
import * as api from '../utils/api';

export class stateLocation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errorMessage:null,
            location:null,
            gps:false,
        }
    }

//Lấy vị trí hiện tại và đăng kí theo dõi thay đổi vị trí của thiết bị
//------------------------------------------------------------------------------------------

    _getLocation = () => {
        this._myLocation = Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 10000,
            distanceInterval: 100
        }, (loc) => {
            if (loc.timestamp) {
                
                let {latitude,longitude} = loc.coords

                //Cập nhật lại store
                this.props.dispatch(
                    {
                        type: 'UPDATE_LOCATION',
                        value: {
                            latitude : latitude,
                            longitude : longitude
                        }
                    }
                );

                //Cập nhật lại local State
                this.setState(oldState => {return({
                    ...oldState, location:loc
                })})

                //Call API update Location trên server
                api.accountUpdateLocation({accountId: this.props.accountId, latitude: latitude, longitude: longitude},)

            } else {
                this.setState({errorMessage:'Problems on update location'})
            }
        })
    }

//Lấy trạng thái quyền truy cập Vị Trí
//------------------------------------------------------------------------------------------

    _getGpsStatus= async () => {
        
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState(oldState => {return({
                ...oldState, errorMessage: 'Permission to access location was denied',
            })})
        }
        
        let gps = await Location.getProviderStatusAsync();
        
        this.setState(oldState => {return({...oldState, gps: gps.gpsAvailable })});
        
        // console.log(gps.gpsAvailable)
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
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocation();
            this._getGpsStatus();
        }
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

export default connect(mapStateToProps)(stateLocation)

