import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import React, { Component } from 'react';
import { color} from '../utils/theme';
import { BarCodeScanner, Permissions }  from 'expo';
import { imgRuby} from '../../assets';
import { connect } from 'react-redux';
import * as api from '../utils/api';

import ModalConfirm from '../components/modalConfirm';

//------------------------------------------------------------------------------------------

export class scrQRCodeScan extends Component {
    static navigationOptions = {
        title : 'QUÉT MÃ QR-CODE',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };
//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            isShowModalConfirm: false,
            scanDone: false,
            modalData: null
        };
    }

//------------------------------------------------------------------------------------------

    async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({hasCameraPermission: status === 'granted'});
    }

//------------------------------------------------------------------------------------------

    _showModal = (action) => {
        
        return (this.state.isShowModalConfirm && 
            <ModalConfirm
                header = {this.state.modalData.header}
                title = {this.state.modalData.title}
                titleFinal = {this.state.modalData.titleFinal}
                textInputDefault = {this.state.modalData.textInputDefault}
                onClose = {() =>{
                    this.setState(oldState => {
                        return({
                            ...oldState,isShowModalConfirm:false, scanDone: false 
                        })
                    })
                }}
                onAction = {action}
            />
        )
    }

//------------------------------------------------------------------------------------------

    _onSendMoney = () => {
        // accountId, partnerId, amount
        api.accountTranferMoney({
            accountId: this.props.accountId,
            partnerId: this.state.modalData.qrAction.value.accountId,
            amount: this.state.modalData.qrAction.value.amount
        },(value)=>{
            // console.log(value)
            if (value.error===0){
                this.setState(oldState => {
                    return({
                        ...oldState,isShowModalConfirm:false, scanDone: false 
                    })
                })
                this.props.dispatch({
                    type:'CASH_OUT',
                    amount: this.state.modalData.qrAction.value.amount
                })
            }                
        })
    }

//------------------------------------------------------------------------------------------

    _onCashInCode = () => {
        // accountId, cashCode,
        api.accountCashinCode({
            accountId: this.props.accountId,
            cashCode: this.state.modalData.qrAction.value.code
        },(value)=>{
            // console.log(value)
            if (value.error===0){
                this.setState(oldState => {
                    return({
                        ...oldState,isShowModalConfirm:false, scanDone: false 
                    })
                })
                this.props.dispatch({
                    type:'CASH_IN',
                    amount: this.state.modalData.qrAction.value.amount
                })
            }                
        })
    }

//------------------------------------------------------------------------------------------

    _handleBarCodeRead = ({ type, data }) => {
        
        if (this.state.scanDone) return

        // Đặt lại State scanDone để đợi sử lý xong tác vụ
        this.setState(oldState=>{return({
            ...oldState,scanDone: true,
        })})

        //Giải mã data
        
        let jsonStr = require('base-64').decode(data);
        let qrAction = JSON.parse(jsonStr);
        console.log(jsonStr)
        //Phân chia trường hợp xử lý code
        switch (qrAction.action) {
            case 'SEND_MONEY':
                this.setState(oldState => {return({
                    ...oldState, modalData: {
                        qrAction : qrAction,
                        header : 'XÁC NHẬN CHUYỂN TIỀN',
                        title : [
                            {leftText: 'Chuyển tiền cho số điện thoại:', rightText: qrAction.value.accountId},
                            {leftText: 'Số tiền:', rightText: `${qrAction.value.amount}đ`},
                            {leftText: 'Phí chuyển tiền:', rightText: '1%'},
                            {leftText: 'Điểm thưởng:', rightText: '2 điểm'},
                        ],
                        titleFinal : [
                            {leftText: 'Thanh toán:', rightText: `${qrAction.value.amount}đ`}
                        ]
                    }
                })})

                this.setState(oldState=>{return({
                    ...oldState, isShowModalConfirm: true
                })})

                break;
            
            case 'CODE_MONEY':
                
                api.accountCheckCode({cashCode:qrAction.value.code},value => {
                    console.log(value)
                    if (value.error === 999)
                    {
                        alert('Lỗi hệ thống')
                        return
                    }

                    if (value.error === 3)
                    {
                        alert('Mã Code nạp tiền này không tồn tại')
                        return
                    }

                    if (value.error === 4)
                    {
                        alert('Mã Code đã sử dụng')
                        return
                    }
                    
                    if (value.error === 0)
                    {
                        qrAction.value.amount = value.data.amount
                        this.setState(oldState => {return({
                            ...oldState, modalData: {
                                qrAction : qrAction,
                                header : 'XÁC NHẬN SỬ DÙNG',
                                title : [
                                    {leftText: 'Loại QR-Code:', rightText: 'Nạp tiền vào ví'},
                                    {leftText: 'Số tiền:', rightText: `${value.data.amount}đ`},
                                    {leftText: 'Triết khấu:', rightText: '1%'},
                                    {leftText: 'Điểm thưởng:', rightText: '2 điểm'},
                                ],
                                textInputDefault : 'Nhập mã giảm giá',
                                titleFinal : [
                                    {leftText: 'Thanh toán:', rightText: `${value.data.amount}đ`}
                                ]
                            }
                        })},()=>{
                            this.setState(oldState=>{return({
                                ...oldState, isShowModalConfirm: true
                            })})
                        })
                    }
                })
                break;
        }

    }
  
//------------------------------------------------------------------------------------------

    render() {

        let { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {

          return <Text>Bạn cần cho phép quyền truy cập camera</Text>;

        } else if (hasCameraPermission === false) {

          return <Text>Máy không có camera</Text>;

        } else {
          
        return (
          <View style={{ flex: 1}}>

            <BarCodeScanner
                style = {[{justifyContent:'flex-end'},StyleSheet.absoluteFill]}
                onBarCodeRead = {this._handleBarCodeRead}>
              
                {/* Touch ra màn hình trợ giúp */}
                <TouchableOpacity onPress = {()=>{
                    this.props.navigation.navigate('ScrQRCodeScanHelp')
                }}>
              
                    <Text style = {{marginBottom:20, textAlign:'center',fontSize: 20,fontWeight: 'bold',color: color.white,}}>
                    <Text style = {{fontSize:36}}>💬</Text> QUÉT MÃ QR-CODE ĐỂ LÀM GÌ ? </Text>
              
                </TouchableOpacity>
                
            </BarCodeScanner>

            {this._showModal(()=>{
                if (this.state.modalData.qrAction.action === 'SEND_MONEY')
                {
                    this._onSendMoney()
                }
                if (this.state.modalData.qrAction.action === 'CODE_MONEY')
                {
                    this._onCashInCode()
                }
            })}
          </View>
        );
      }
    }
};

//------------------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    return {
        accountId: state.accountId
    }
}

// const mapDispatchToProps = {
  
// };

export default connect(mapStateToProps)(scrQRCodeScan)

// export default scrQRCodeScan

//------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    //   height : 300,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
  });
  