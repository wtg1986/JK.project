import React, { Component } from 'react';
import { View,TouchableOpacity,Text,StyleSheet,ScrollView } from 'react-native';
import { color } from '../utils/theme';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonGroupFeature from '../components/buttonGroupFeature';
import ButtonGroupFuntion from '../components/buttonGroupFuntion';
import ModalShareFriends from '../components/modalShareFriends';
import StateLocation from '../containers/stateLocation';
import StatePushNotification from '../containers/statePushNotification';

import { connect } from 'react-redux';

export class scrHome extends Component {
//   static propTypes = {
//     prop: PropTypes
//   };
    static navigationOptions = {
        header :null
    };
    
    constructor(props) {
        super(props);
        this.state = { 
            isShowModal : false,
            myAssetCnt : 15,
            screenFunction : [
                'ScrPaymentGame', 
                'ScrTranferMoney', 
                'ScrBuyCardCode', 
                'ScrLuckyWheel', 
                'ScrRadarCode',  
                'ScrSellCardCode', 
                'ScrBookHomeStay', 
                'ScrLinkBlockchain', 
            ]
        }
    }

  render() {
    return (
        <StatePushNotification>
        <StateLocation>
            <View style = {style.root}>
                <View style = {style.top}> 
                    <View style = {{justifyContent : 'space-between',height : 100,marginTop:20}}>
                        <View style = {{marginHorizontal:15,height : 44,flexDirection:'row',alignItems :'center',justifyContent:'space-between'}}> 
                            <TouchableOpacity style = {{flexDirection:'row',alignItems :'center'}}
                                onPress = {()=>{this.props.navigation.navigate('ScrProfile')}}
                            >
                                <EntypoIcon name = {'wallet'} size= {32} color={color.white}/> 
                                <Text style = {{marginHorizontal: 3, color: color.white, fontSize: 17, fontWeight:'900'}}>
                                    {this.props.mobileNumber} 
                                </Text>

                                {this.props.accountType === 'agency' ? <EntypoIcon name = {'shield'} size= {20} color = {color.warning}/> : null} 
                            </TouchableOpacity>

                            <TouchableOpacity style = {{flexDirection:'row',alignItems :'center'}}
                                onPress = {()=>{
                                    this.setState(oldState =>{
                                        return ({
                                            ...oldState, isShowModal:true
                                        })
                                    })
                                }}
                            >
                                <EntypoIcon name = {'slideshare'} size= {32} color={color.white} /> 
                            </TouchableOpacity>
                        </View>

                        <View style = {{borderBottomWidth:1, borderBottomColor:color.primaryShadow, marginHorizontal:15,height : 48,flexDirection:'row',alignItems :'center',justifyContent:'space-between'}}>
                            <Text style = {{marginLeft: 3, color: color.white, fontSize: 26, fontWeight:'700',
                                            shadowColor: '#1E1E1E',
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowRadius: 3,
                                            shadowOpacity: .6}}>
                                {this.props.balance} vnđ
                            </Text>

                            <View style = {{flexDirection:'row',alignItems :'center'}}>
                                <Text style = {{color: color.white, fontSize: 18, fontWeight:'bold',}}>
                                    {this.props.cashBackPoint}
                                </Text>
                                <MaterialCommunityIcons name = {'water-percent'} size= {32} color={color.white} /> 
                            </View>
                        </View>
                    </View>
                </View>
            
                <View style = {style.body}>

                <ScrollView keyboardShouldPersistTaps ='always'>

                    <View style = {style.boxFunction}>

                        <ButtonGroupFuntion
                            iconLabel = {[
                                {label : 'Nạp Game', icon :'game-controller', family: 'Entypo'},
                                {label : 'Chuyển Khoản', icon :'cached',family: 'MaterialCommunityIcons' },
                                {label : 'Mua Thẻ Cào', icon :'cards',family: 'MaterialCommunityIcons' },
                                {label : 'Vòng Quay May Mắn', icon :'empire',family: 'FontAwesome' },
                                {label : 'Radar Giftcode', icon :'radar',family: 'MaterialCommunityIcons' },
                                {label : 'Thu Mua Mã Thẻ', icon :'cash-multiple',family: 'MaterialCommunityIcons' },
                                {label : 'Đặt HomeStay', icon :'home-heart',family: 'MaterialCommunityIcons' },
                                {label : 'Liên Kết Ví Blockchain', icon :'chain',family: 'FontAwesome' },
                            ]}
                            iconColor = {['#619C44','#D96B0C','#5125AD','#328DAA','#9C29B7','#74422B','#E93578','#5A5776']}
                            
                            onPress = {[
                                ()=>{this.props.navigation.navigate('ScrPaymentGame')},
                                
                                ()=>{this.props.navigation.navigate('ScrTranferMoney')},
                                
                                ()=>{this.props.navigation.navigate('ScrBuyCardCode')}, 
                                
                                ()=>{this.props.navigation.navigate('ScrLuckyWheel')},
                                
                                ()=>{this.props.navigation.navigate('ScrRadarCode')},
                                
                                ()=>{this.props.navigation.navigate('ScrSellCardCode')},
                                
                                ()=>{this.props.navigation.navigate('ScrBookHomeStay')},
                            
                                ()=>{this.props.navigation.navigate('ScrLinkBlockchain')},
                            ]}
                        >
                        </ButtonGroupFuntion>

                    </View>
                    
                </ScrollView>

                </View>
            
                
                <ButtonGroupFeature
                    iconLabel = {[
                        {label : 'Nạp Ví', icon :'sign-in' },
                        {label : 'Rút Ví', icon :'sign-out' },
                        {label : 'Quét Mã', icon :'qrcode' },
                        {label : 'Giỏ Đồ', icon :'shopping-basket' }
                    ]}
                    iconLabelColor = {color.textDark}
                    badgeColor = {{background : color.warning, text : color.white}}
                    onPress = {[
                        ()=>{this.props.navigation.navigate('ScrPaymentWallet')},
                        ()=>{this.props.navigation.navigate('ScrCashOutWallet')},
                        ()=>{this.props.navigation.navigate('ScrQRCodeScan')},
                        ()=>{this.props.navigation.navigate('ScrMyBag')},
                    ]}
                    badgeBagCount = {this.state.myAssetCnt}
                />
                
                {this.state.isShowModal && 
                <ModalShareFriends
                    onClose = {() =>{
                        this.setState(oldState => {
                            return({
                                ...oldState,isShowModal:false    
                            })
                        })
                    }}
                />}

            </View>
        </StateLocation>
        </StatePushNotification>
    )
  };
};

// accountId : value.accountId,
// mobileNumber : value.mobileNumber,
// pushToken : value.pushToken,
// newNotiCount : value.newNotiCount,
// latitude : value.latitude,
// longitude : value.longitude,
// refCode : value.refCode,
// cashBackPoint : value.cashBackPoint,
// balance : value.balance,
// avataUrl : value.avataUrl,
// address : value.address,
// username : value.username,
// passport : value.passport,
// email : value.email,
  
const mapStateToProps = (state) => {
    return { 
        accountId: state.accountId,
        accountType: state.accountType,
        mobileNumber: state.mobileNumber,
        balance: state.balance,
        cashBackPoint: state.cashBackPoint
    }
}

export default connect(mapStateToProps)(scrHome)
// export default scrHome

const style = StyleSheet.create(
    {
        root : {
            flex: 1,
            flexDirection:'column',
            justifyContent: 'flex-start',
        },
        body : {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            backgroundColor : color.background
        },
        top : {
            height : 188,
            justifyContent: 'flex-start',
            backgroundColor : color.primary
        },
        boxFunction : {
            backgroundColor : color.box,
            // height : 320,
            paddingVertical: 10,
            marginTop : 56,
            marginHorizontal: 15,
            borderRadius : 10,
            justifyContent :'center',
            // shadowColor: '#929292',
            // shadowOffset: { width: 1, height: 1 },
            // shadowRadius: 2.5,
            // shadowOpacity: .3,
        }
    }
  )