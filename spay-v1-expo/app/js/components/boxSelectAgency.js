// AIzaSyA7oR3gaCzIsBFqR5JfssUXYjtgsPgNChI  -ios
// AIzaSyDxrS6mzdCtaxBv25KiuRtrD4o4muIjC5s  -android
import {Text, 
        View, 
        StyleSheet, 
        Image, 
        TextInput, 
        Animated,
        TouchableWithoutFeedback,
        TouchableOpacity,
        Easing} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import {MapView, Location, Permissions, Constants}  from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {svgAvataMen,imgVisa} from '../../assets';
import Button from '../components/button';
import Box from '../components/box';
import {generatedMapStyle} from '../ultis/mapStyle';

export default class name extends Component {
    static propTypes = {
        header : PropTypes.string,
        agencys : PropTypes.array, //{agencyId,avataUri,agencyName,address,distance,latitude,longitude}
    };   
    static defaultProps ={
        header : 'CHỌN ĐẠI LÝ',
        agencys : [{ 
                agencyId : 1,
                avataUri : 'http://10.1.1.4:5000/jpgs/avata_0973651368.jpg',
                agencyName : 'Kenny Tran',
                address : '106/41 Phố Vọng, Hai Bà Trưng',
                distance : '1.2km',
                latitude : 20.995174,
                longitude : 105.862480
            },{ 
                agencyId : 2,
                avataUri : 'http://10.1.1.4:5000/jpgs/avata_0904061516.jpg',
                agencyName : 'Ngọc Bảo',
                address : '18 Tam Trinh',
                distance : '1.6km',
                latitude : 21.0029,
                longitude : 105.8656
            },{ 
                agencyId : 3,
                avataUri : 'http://10.1.1.4:5000/jpgs/avata_0983281083.jpg',
                agencyName : 'Trần Hằng',
                address : 'Tam Trinh',
                distance : '550m',
                latitude : 20.9943,
                longitude : 105.8552
            },{ 
                agencyId : 4,
                avataUri : 'http://10.1.1.4:5000/jpgs/avata_0904396877.jpg',
                agencyName : 'Quỳnh Tít',
                address : 'Trương Định',
                distance : '900m',
                latitude : 21.0183,
                longitude : 105.8551
            }
        ]
    }

//------------------------------------------------------------------------------------------
    
    constructor(props) {
        super(props);
        this.state = {
            errorMessageMap : null,
            selected : -1,
            heightTextInput : new Animated.Value(0),
            mapMode : false,
            myLocation: null,
            infoAgency : {}
        };
    }

//------------------------------------------------------------------------------------------
    
    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
              ...this.state,
              errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

//------------------------------------------------------------------------------------------
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            ...this.state,
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let lo = await Location.getCurrentPositionAsync({});
        this.setState({ 
            ...this.state,
            location : lo
        });
    };

//------------------------------------------------------------------------------------------
// agencyId,avataUri,agencyName,address,distance,latitude,longitude
    _renderElementAgency = (agencyOj,isSelect) =>{
        return (
            <View style = {[style.elementAgency, {
                borderColor : isSelect ? color.primary : color.shadow,
                backgroundColor : isSelect ? color.primary : null}]} 
                key = {agencyOj.agencyId}>
            
                <View style = {{flexDirection : 'row',justifyContent : 'space-between',}}>

                    <Image key = 'Avata' style = {style.avataAgency} source = {{uri: agencyOj.avataUri}} />

                    <View key = 'Info_Agency'
                        style = {{flex: 1, marginHorizontal: 5, flexDirection: 'column', justifyContent: 'center'}}>

                        <View style ={{justifyContent: 'space-between', flexDirection: 'row', marginVertical: 3}}>

                            <Text style ={[style.textNameAgency, {color : isSelect ? color.white : color.textDark}]}>
                                {agencyOj.agencyName}
                            </Text>

                            <Text style ={[style.textDistanceAgency, {color : isSelect ? color.white : color.secondary}]}>
                                {agencyOj.distance}
                            </Text>

                        </View>

                        <Text style ={[style.textAddressAgency, {color : isSelect ? color.white : color.textDark}]}>
                            {agencyOj.address}
                        </Text>

                    </View>

                    <View key = 'Arrow_Button' style = {{justifyContent: 'center', marginHorizontal: 10}}>
                        <Ionicons 
                            name = 'ios-arrow-round-down-outline'
                            size = {30} 
                            color = {isSelect ? color.white : color.textGray} > 
                        </Ionicons>
                    </View>
                </View>

                {/* --------------------------------------- */}

                {isSelect && 
                <Animated.View  style = {{flexDirection: 'row', height: this.state.heightTextInput, margin: 10,}}>

                    <View style ={{borderBottomWidth:2, borderColor: color.white, height: 32}}>
                        <Ionicons 
                            name = 'ios-chatbubbles-outline' 
                            size = {26} 
                            color = {isSelect ? color.white : color.textGray} > 
                        </Ionicons>
                    </View>

                    <TextInput 
                        // ref = {me => this.textInputComponent[i] = me}
                        style = {style.textInputMessage}
                        placeholder = 'Nhập lời nhắn cho Đại Lý'
                        onChangeText = {input => {
                            // let [ ...newValue ] = this.state.value;
                            // newValue[i] = input;
                            // this.setState({...this.state, value:newValue})
                        }}/>

                </Animated.View>}

            </View>
        )
    }

//------------------------------------------------------------------------------------------
    _renderListAgency = (data) => {
        return(
            data.map((oj,i)=>
            <TouchableWithoutFeedback key = {i} onPress = {()=>{

                Animated.timing(this.state.heightTextInput,{easing: Easing.easeOutElastic, 
                                                            duration: 5,
                                                            toValue: 0})
                        .start(()=>{
                            this.setState(oldState => {return({...oldState, selected:i})},()=>{
                            Animated.timing(this.state.heightTextInput,{easing: Easing.easeOutElastic, 
                                                                        duration: 300,
                                                                        toValue: 32})
                                    .start()
                    })
                })
            }}>
                {this._renderElementAgency(oj,this.state.selected == i)}
            </TouchableWithoutFeedback>)
        )
    }

//------------------------------------------------------------------------------------------

    _renderMapAgency = (data) => {
        // alert(`${this.state.location.coords.latitude}---${this.state.location.coords.longitude}`)
        return(
            <MapView
                // provider =  'google'
                style = {style.mapAgency}
                customMapStyle = {generatedMapStyle}
                showsUserLocation={true}
                // followsUserLocation = {true}
                showsMyLocationButton={true}
                region = {{
                    latitude: this.state.location.coords.latitude,
                    longitude: this.state.location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                {
                    data.map((oj,i) => (
                        <MapView.Marker
                            coordinate={{latitude: oj.latitude, longitude: oj.longitude}}
                            // image={{uri:oj.avataUri}}
                            // title = {oj.agencyName}
                            // description = {oj.address}
                        >

                            <Image style = {style.avataAgencyMap} source = {{uri:oj.avataUri}} />
                            
                            <MapView.Callout>
                                <View style={{flex:1,width : 160}}>
                                    <Text style= {{marginVertical:3, color:color.textDark, fontSize:17,fontWeight:'bold'}}> {oj.agencyName} </Text>
                                    <Text style= {{marginVertical:3, color:color.textDark, fontSize:14,fontStyle:'italic'}}> {oj.address} </Text>
                                    <Button text = 'CHỌN' onPress = {()=>{
                                        this.setState(oldState =>{return({...oldState,mapMode:false,selected:i})},
                                        ()=>{
                                            Animated.timing(this.state.heightTextInput,{easing: Easing.easeOutElastic, 
                                                                                        duration: 300,
                                                                                        toValue: 32})
                                                    .start()
                                        })
                                    }}/>
                                </View>
                            </MapView.Callout>
                            
                        </MapView.Marker>))
                }

            </MapView>
        )
    }

    render() {
        return (
            <Box full = {true} header = {this.props.header}>
                <TouchableOpacity style = {{position:'absolute',right: 7,top:7,}}
                    onPress ={()=>{
                        this.setState(oldState =>{return({...oldState,mapMode: !oldState.mapMode})})
                    }}>
                
                    <MaterialCommunityIcons 
                        style ={style.mapMode}
                        name = {this.state.mapMode ? 'equal-box' : 'map-marker-radius'}
                        size = {44} 
                        color = {color.secondary} > 
                    </MaterialCommunityIcons>

                </TouchableOpacity>

                {
                    !this.state.mapMode ?
                    this._renderListAgency(this.props.agencys):
                    this._renderMapAgency(this.props.agencys)
                }
            </Box>
        )
    };
};
      
const style = StyleSheet.create({
    elementAgency : {
        borderRadius : 9,
        borderWidth : 1,
        padding : 3,
        marginVertical: 2.5,
    },
    avataAgency : {
        borderColor:color.shadow,
        borderWidth:1,
        width:48,
        height:48, 
        borderRadius:16
    },
    textNameAgency : {
        fontSize:17,
        fontWeight:'bold',
    },
    textAddressAgency : {
        fontStyle:'italic',
    },
    textDistanceAgency : {
        fontStyle:'italic',
    },
    textInputMessage : {
        flex:1,
        fontSize : 17,
        height: 32, 
        borderColor: color.white, 
        borderBottomWidth: 2,
        paddingLeft:8,
        color: color.white
    },
    iconSwitchMapMode : {
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .5,
    },
    mapAgency : {
        flex : 1,
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: color.textGray,
        borderWidth: 1,
    },
    avataAgencyMap : {
        width : 40,
        height : 40,
        borderRadius : 12,
        borderColor : color.white,
        borderWidth : 2,
    }

})

{/* coords (object) — The coordinates of the position, with the following fields:
 latitude (number) — The latitude in degrees.
 longitude (number) — The longitude in degrees.
 altitude (number) — The altitude in meters above the WGS 84 reference ellipsoid.
 accuracy (number) — The radius of uncertainty for the location, measured in meters.
 altitudeAccuracy (number) — The accuracy of the altitude value, in meters (iOS only).
 heading (number) — Horizontal direction of travel of this device, measured in degrees starting at due north and continuing clockwise around the compass. Thus, north is 0 degrees, east is 90 degrees, south is 180 degrees, and so on.
 speed (number) — The instantaneous speed of the device in meters per second.
timestamp (number) — The time at which this position information was obtained, in milliseconds since epoch. */}
