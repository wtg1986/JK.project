import React, { Component } from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
    Alert, 
    Animated,
    Easing } from 'react-native';
import { color } from '../utils/theme';
import * as actions from '../actions';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonGroupFeature from '../components/buttonGroupFeature';
import ButtonGroupFuntion from '../components/buttonGroupFuntion';
import ModalShareFriends from '../components/modalShareFriends';
import StateLocation from '../containers/stateLocation';
import StatePushNotification from '../containers/statePushNotification';
import StateIO from '../containers/stateIO';
import LoadingIndicators from '../components/loadingIndicators';
import ToastMessage from '../components/toastMessage';
import {anim} from '../actions/middleware';

import numeral from 'numeral';
import * as api from '../utils/api';

import { connect } from 'react-redux';

export class scrHome extends Component {

    static navigationOptions = {
        header :null
    };
    
    constructor(props) {
        super(props);
        this.state = { 
            topToast : new Animated.Value(22),
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
            <StateIO ref = {c => this.io = c}>
            {/* <StatePushNotification>
            <StateLocation> */}
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
                                    {numeral(this.props.balance).format('0,0')} vnđ
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
                                    {label : 'Mua Mã Thẻ', icon :'cards',family: 'MaterialCommunityIcons' },
                                    {label : 'Chuyển Khoản', icon :'cached',family: 'MaterialCommunityIcons' },
                                    {label : 'V.Q.M.M', icon :'empire',family: 'FontAwesome' },
                                    // {label : 'Radar Giftcode', icon :'radar',family: 'MaterialCommunityIcons' },
                                    // {label : 'Thu Mua Mã Thẻ', icon :'cash-multiple',family: 'MaterialCommunityIcons' },
                                    {label : 'HomeStay', icon :'home-heart',family: 'MaterialCommunityIcons' },
                                    // {label : 'Liên Kết Ví Blockchain', icon :'chain',family: 'FontAwesome' },
                                ]}
                                iconColor = {['#619C44','#D96B0C','#5125AD','#328DAA','#9C29B7','#74422B','#E93578','#5A5776']}
                                
                                onPress = {[
                                    ()=>{this.props.navigation.navigate('ScrPaymentGame')},

                                    ()=>{this.props.navigation.navigate('ScrBuyCardCode')},
                                    
                                    ()=>{this.props.navigation.navigate('ScrTranferMoney')}, 
                                    
                                    ()=>{
                                        // this.props.navigation.navigate('ScrLuckyWheel')
                                        this.props.navigation.navigate('ScrChat',{
                                            title: this.props.mobileNumber === '0973651368'?'0968434969':'0973651368',
                                            accountId: this.props.mobileNumber === '0973651368'?'0968434969':'0973651368',
                                            mobileNumber: this.props.mobileNumber === '0973651368'?'0968434969':'0973651368',
                                            userName:'Kenny Tran',
                                            avataUrl: this.props.mobileNumber === '0973651368'? 
                                            '/resources/images/avatas/avata_.jpg' : '/resources/images/avatas/avata_0973651368.jpg',
                                            istance : '16km'
                                        })
                                    },
                                    
                                    // ()=>{this.props.navigation.navigate('ScrRadarCode')},
                                    
                                    // ()=>{this.props.navigation.navigate('ScrSellCardCode')},
                                    
                                    ()=>{this.props.navigation.navigate('ScrBookHomeStay')},
                                
                                    // ()=>{this.props.navigation.navigate('ScrLinkBlockchain')},
                                ]}
                            >
                            </ButtonGroupFuntion>

                        </View>
                        
                    </ScrollView>

                    </View>
                
                    
                    <ButtonGroupFeature
                        iconLabel = {[
                            {label : 'Nạp Ví', icon :'sign-in' },
                            // {label : 'Rút Ví', icon :'sign-out' },
                            {label : 'Quét Mã', icon :'qrcode' },
                            {label : 'Giỏ Đồ', icon :'shopping-basket' }
                        ]}
                        iconLabelColor = {color.textDark}
                        badgeColor = {{background : color.warning, text : color.white}}
                        onPress = {[
                            ()=>{this.props.navigation.navigate('ScrPaymentWallet')},
                            // ()=>{this.props.navigation.navigate('ScrCashOutWallet')},
                            ()=>{this.props.navigation.navigate('ScrQRCodeScan')},
                            ()=>{
                                // this.props.loadingIndicators(true)
                                this.props.showToastMessage({
                                    toastMessage : 'Khánh kiểm tra hiển thị Toast Message',
                                    toastIcon : 'info-with-circle',
                                    toastIconColor : 'tomato',
                                },2000)
                                // api.upload()
                                // this.props.navigation.navigate('ScrMyBag')
                            },
                        ]}
                        badgeBagCount = {this.state.myAssetCnt}
                    />

                    
                    <ModalShareFriends
                        shareCode = {this.props.refCode}
                        isShowModal = {this.state.isShowModal}
                        onDone = {refCode => {
                        
                            this.setState(oldState => {
                                return({
                                    ...oldState,isShowModal:false    
                                })
                            },() => {
                                // Gọi API cộng thưởng.
                                api.accountActiveRefCode({refCode: refCode},this.props.accessToken,
                                    (value) => {
                                        if (value.success) {
                                            // this.props.dispatch({
                                            //     type: 'UPDATE_BALANCE',
                                            //     value: {balance: value.balance}
                                            // })
                                            this.props.setBalance(value.balance)
                                        } else {
                                            Alert.alert('THÔNG BÁO',value.message)
                                        }
                                    }
                                )
                            })
                            
                        }}

                        onClose = {() =>{
                            this.setState(oldState => {
                                return({
                                    ...oldState,isShowModal:false    
                                })
                            })
                        }}
                    />

                </View>
            {/* </StateLocation>
            </StatePushNotification> */}
            </StateIO>
        )
    };
};
  
const mapStateToProps = (state) => {
    return { 
        // isLoading: state.isLoading,
        accountId: state.accountId,
        userName: state.userName,
        accountType: state.accountType,
        mobileNumber: state.mobileNumber,
        accessToken: state.accessToken,
        balance: state.balance,
        cashBackPoint: state.cashBackPoint,
        refCode: state.refCode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingIndicators: (value) => { dispatch(actions.loadingIndicators(value)) },
        showToastMessage: (value, duration) => { dispatch(actions.showToastMessage(value, duration)) },
        setBalance: (value) => { dispatch(actions.setBalance(value)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(scrHome)

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