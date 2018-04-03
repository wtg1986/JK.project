import React, { Component } from 'react';
import {Text, 
        View, 
        StyleSheet, 
        Image, 
        TextInput, 
        Animated,
        TouchableWithoutFeedback,
        TouchableOpacity,
        Easing} from 'react-native';

import { color } from '../ultis/theme';
import Box from '../components/box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {svgAvataMen,imgVisa} from '../../assets';
import {MapView}  from 'expo';

// import SvgUri from 'react-native-svg-uri'
// import WImage from '../components/fullWidthImage';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrPaymentWalletAgency extends Component {
    static navigationOptions = {
        title : 'NẠP TIỀN TỪ ĐẠI LÝ',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : ' ',
    };

//   static propTypes = {
//     prop: PropTypes
//   };

    constructor(props) {
        super(props);
        // let {height, width} = Dimensions.get('window');
        this.state = { 
            selected : -1,
            heightTextInput : new Animated.Value(0),
            mapMode : false,
            infoAgency : {}
        };
    }

    _renderElementAgnecy = (index,agencyName,address,distance,isSelect) =>{
        return (
            <View style = {{
                borderRadius : 9,
                borderWidth : 1,
                borderColor : isSelect ? color.primary : color.shadow,
                padding : 3,
                marginVertical: 2.5,
                backgroundColor : isSelect ? color.primary : null
            }} key = {index}>
            
                <View style = {{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    // backgroundColor : color.test
                }}>
                    <Image key = 'Avata' 
                        style = {{borderColor:color.shadow,
                            borderWidth:1,
                            width:48,
                            height:48, 
                            borderRadius:24}}
                        source = {imgVisa}/>

                    <View key = 'Text_Agency>'
                        style = {{
                            flex : 1,
                            marginHorizontal : 5,
                            flexDirection : 'column',
                            justifyContent: 'center'
                        }}>

                        <View style ={{
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            marginVertical : 3
                        }}>
                            <Text style ={{fontSize:17,
                                fontWeight:'bold',
                                    color : isSelect ? color.white : color.textDark}}>
                                {agencyName}
                            </Text>

                            <Text style ={{fontStyle:'italic', 
                                color : isSelect ? color.white : color.secondary}}>
                                {distance}
                            </Text>
                        </View>

                        <Text style ={{fontStyle:'italic',
                            color : isSelect ? color.white : color.textDark}}>
                            {address}
                        </Text>
                    </View>

                    <View key = 'Arrow_Button'
                        style = {{justifyContent:'center',marginHorizontal:10}}>
                        <Ionicons 
                            name = 'ios-arrow-round-down-outline'
                            size = {30} 
                            color = {isSelect ? color.white : color.textGray} > 
                        </Ionicons>
                    </View>
                </View>
{/* ------------------------- */}
                {isSelect && <Animated.View  style = {{
                    height : this.state.heightTextInput,
                    margin : 10,
                    // backgroundColor : 'red'
                    flexDirection : 'row'
                }}>
                    <View style ={{
                        borderBottomWidth:2,
                        borderColor : color.white,
                        height : 32
                    }}>
                        <Ionicons 
                            name = 'ios-chatbubbles'
                            size = {26} 
                            color = {isSelect ? color.white : color.textGray} > 
                        </Ionicons>
                    </View>
                    
                    <TextInput 
                        // ref = {me => this.textInputComponent[i] = me}
                        style = {{
                            flex:1,
                            fontSize : 17,
                            height: 32, 
                            borderColor: color.white, 
                            borderBottomWidth: 2,
                            paddingLeft:8,
                            color: color.white
                        }}
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

    render() {
        // agencyName,address,distance,isSelect
        const data = [
            {agencyName:'Dương Gia',
            address:'38 Bạch Mai, Hai Bà Trưng', 
            distance:'800m',
            isSelect:false},

            {agencyName:'Triệu Gia',
            address:'68 Triều Khúc, Thanh Xuân', 
            distance:'5.2km',
            isSelect:true},

            {agencyName:'Trần Gia',
            address:'104/41 Phố Vọng, Hai Bà Trưng', 
            distance:'1,5km',
            isSelect:false},
        ]
        return (
        /*
            <MapView
                style = {{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  //   height : 300,
                  }}
                // provider =  'google'
                showsUserLocation={true}
                followsUserLocation = {true}
                // initialRegion={{
                //     latitude: 37.78825,
                //     longitude: -122.4324,
                //     latitudeDelta: 0.0922,
                //     longitudeDelta: 0.0421,
                // }}
            />
        */
        
            <View style = {style.root}>
               
                <Box header = 'CHỌN ĐẠI LÝ'>
                   
                    <TouchableOpacity onPress ={()=>{
                        this.setState(oldState =>{
                            return({...oldState,mapMode:!oldState.mapMode})
                        })
                    }}
                    style = {{
                        position:'absolute',
                        right: 7,top:7,
                    }}>
                        <MaterialCommunityIcons 
                            style ={{
                                shadowColor: '#929292',
                                shadowOffset: { width: .6, height: .6 },
                                shadowRadius: 2.5,
                                shadowOpacity: .4,}}
                            name = 'map-marker-radius'
                            size = {44} 
                            color = {color.secondary} > 
                        </MaterialCommunityIcons>
                    </TouchableOpacity>

                    {
                        this.state.mapMode ?

                        data.map((oj,i)=>
                        <TouchableWithoutFeedback key = {i} onPress = {()=>{
                            Animated.timing(this.state.heightTextInput, 
                            {
                                easing: Easing.easeOutElastic,
                                duration: 5,
                                toValue: 0
                            }).start(()=>{
                                this.setState(oldState => {return(
                                    {...oldState, selected:i}
                                )},()=>{
                                    Animated.timing(this.state.heightTextInput, 
                                        {   
                                            easing: Easing.easeOutElastic,
                                            duration: 300,
                                            toValue: 32
                                        }).start()
                                })
                            })
                        }}>
                            {this._renderElementAgnecy(i,
                            oj.agencyName,
                            oj.address,
                            oj.distance,
                            this.state.selected == i)}
                        </TouchableWithoutFeedback>) :
                        
                        <MapView
                            style = {{
                                alignItems: 'center',
                                height: 450,
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderColor: color.textGray,
                                borderWidth: 1,
                            }}
                            showsUserLocation={true}
                            followsUserLocation = {true}
                        />
                        
                    }

                </Box>
            </View>
        
        )
    };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrPaymentWalletAgency

const style = StyleSheet.create(
    {
        root : {
            flex : 1, 
            justifyContent : 'space-between',
            paddingHorizontal : 10,
            paddingBottom: 15,
            backgroundColor : color.background,
        },
    })