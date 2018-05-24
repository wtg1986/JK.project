import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { color} from '../utils/theme';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ElementAgency from '../components/elementAgency';
import {MapView} from 'expo';
import Button from '../components/button';
import { socketio } from '../containers/stateIO';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class scrAgency extends Component {
    static navigationOptions = {
        header :null, 
    };

    constructor(props) {
        super(props);
        this.state = { 
            inputValue : '',
            showSearchGroup : false,
            showType : 'Map',
            sortBy : 'Dynamic'
        };
        this.socket = socketio.getInstance() // Class Socket để nhận và gửi dữ liệu chat
    }

    
    componentDidMount = () => {
        this.setState(oldState => {return({
            ...oldState, showSearchGroup: true
        })})
    }

    _renderSearchGroup = (action) => {
        // Vẽ nhóm input và button.
        return (
            <View style = {style.groupInput}>
                <TextInput
                    ref = {me => this.messageInput = me}
                    style = {style.textInput}
                    autoCorrect = {false}
                    underlineColorAndroid = 'transparent'
                    value = {this.state.inputValue}
                    keyboardType = 'default'
                    placeholder = 'Tìm kiếm đại lý...'
                    onChangeText = {(input)=>{
                        this.setState(oldState => {return({...oldState, inputValue: input})})
                    }}
                />
                <View style = {{flexDirection: 'column', justifyContent: 'flex-end',}}>
                    <View style = {{flexDirection: 'row'}}>
                        
                        <Button 
                            height = {44} width = {44}
                            backgroundColor = {color.textGray}
                            icon = {<Icon name = {this.state.showType === 'List' ? 'map-marker-radius' : 'view-list'}  size = {26} color = {color.white} />}
                            text = ''
                            onPress = {() => {
                                this.setState(oldState => {return({
                                    ...oldState, showType: oldState.showType === 'List' ? 'Map' : 'List'
                                })})
                            }}
                        />

                        {/* { this.state.showType === 'List'  &&
                            <Button 
                                height = {44} width = {44}
                                backgroundColor = {color.secondary}
                                icon = {<Icon name = {this.state.sortBy === 'Dynamic' ? 'star-circle' : 'motorbike'}
                                            size = {30} color = {color.white} />}
                                text = ''
                                onPress = {() => {
                                    this.setState(oldState => {return({
                                        ...oldState, sortBy: oldState.sortBy === 'Dynamic' ? 'Distance' : 'Dynamic'
                                    })})
                                }}
                            />
                        } */}

                    </View>
                </View>
            </View>
        )
    }

    _renderMapAgency = (data) => {
        // alert(`${this.state.location.coords.latitude}---${this.state.location.coords.longitude}`)
        return(
            <MapView
                // provider =  'google'
                style = {style.mapAgency}
                // customMapStyle = {generatedMapStyle}
                showsUserLocation={true}
                // followsUserLocation = {true}
                showsMyLocationButton={true}
                region = {{
                    latitude: this.props.latitude,
                    longitude: this.props.longitude,
                    latitudeDelta: 0.0925,
                    longitudeDelta: 0.0424,
                }}>
                {
                    // data.map((oj,i) => (
                    //     <MapView.Marker
                    //         coordinate={{latitude: oj.latitude, longitude: oj.longitude}}
                    //         // image={{uri:oj.avataUri}}
                    //         // title = {oj.agencyName}
                    //         // description = {oj.address}
                    //     >

                    //         <Image style = {style.avataAgencyMap} source = {{uri:oj.avataUri}} />
                            
                    //         <MapView.Callout>
                    //             <View style={{flex:1,width : 160}}>
                    //                 <Text style= {{marginVertical:3, color:color.textDark, fontSize:17,fontWeight:'bold'}}> {oj.agencyName} </Text>
                    //                 <Text style= {{marginVertical:3, color:color.textDark, fontSize:14,fontStyle:'italic'}}> {oj.address} </Text>
                    //                 <Button text = 'CHỌN' onPress = {()=>{
                    //                     this.setState(oldState =>{return({...oldState,mapMode:false,selected:i})},
                    //                     ()=>{
                    //                         Animated.timing(this.state.heightTextInput,{easing: Easing.easeOutElastic, 
                    //                                                                     duration: 300,
                    //                                                                     toValue: 32})
                    //                                 .start()
                    //                     })
                    //                 }}/>
                    //             </View>
                    //         </MapView.Callout>
                            
                    //     </MapView.Marker>))
                }
            </MapView>
        )
    }

    _renderListAgency = (data) => {
        return (
            <View style={{
                // flex : 1,
                top : 80,
                justifyContent: 'flex-start',
            }}>
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
            
                }}>
                    <View style = {{flex:1,alignItems:'center'}}>
                        <Text style = {{
                            color : color.textDark,
                            fontSize : 18,
                        }}>
                            {this.state.sortBy === 'Dynamic' ? 'NĂNG ĐỘNG NHẤT': 'GẦN BẠN NHẤT'}
                        </Text>
                    </View>
                    <TouchableOpacity style = {{marginRight: 13}}
                        onPress = {() => {
                            this.setState(oldState => {return({
                                ...oldState, sortBy: oldState.sortBy === 'Dynamic' ? 'Distance' : 'Dynamic'
                            })})
                        }}
                    >
                        <Icon 
                            style = {{
                                alignItems: 'center',
                                shadowColor: '#929292',
                                shadowOffset: { width: 1, height: 1 },
                                shadowRadius: 3,
                                shadowOpacity: .7,
                            }}
                            name = {this.state.sortBy === 'Dynamic' ? 'toggle-switch' : 'toggle-switch-off'}
                            size = {42} 
                            color = {color.primary} 
                        />
                    </TouchableOpacity>
                </View>

                <ElementAgency/>
                <ElementAgency/>
                <ElementAgency/>
            </View>
        )
    }

    render() {
        return (
            <View style ={style.root}>
                {/* <ElementAgency/>
                <ElementAgency/>
                <ElementAgency/> */}
                {
                    this.state.showType === 'Map' ?
                    this._renderMapAgency({}) :
                    this._renderListAgency({})
                }
                {this.state.showSearchGroup && this._renderSearchGroup()}
            </View>
        )
    };
};

const mapStateToProps = (state) => {
    return { 
        // isLoading: state.isLoading,
        latitude: state.latitude,
        longitude: state.longitude,
    }
}

// const mapDispatchToProps = {
  
// };

export default connect(mapStateToProps)(scrAgency)
// export default scrAgency
const style = StyleSheet.create(
{
    root : {
        backgroundColor : color.background,
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    mapAgency : {
        flex : 1,
        justifyContent: 'flex-start',
    },
    groupInput : {
        flexDirection: 'row',
        marginTop: 26,
        position: 'absolute',
        marginHorizontal: 10,
    },
    textInput : {
        flex:1,
        fontSize: 18,
        color:color.textDark,
        paddingHorizontal: 11,
        paddingTop: 11,
        paddingBottom: 11,
        backgroundColor: color.white,
        marginRight: 10,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 3,
        shadowOpacity: .5,
    }
})