import React, { Component } from 'react';
import {Text, 
        View, 
        StyleSheet,} from 'react-native';
import { color } from '../utils/theme';
import Button from '../components/button';
import BoxSelectAgency from '../components/boxSelectAgency';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import {serverResource} from '../utils/global';
import ModalConfirm from '../components/modalConfirm';

export class scrPaymentWalletAgency extends Component {

    static navigationOptions = {
        title : 'NẠP TIỀN TỪ ĐẠI LÝ',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };

    constructor(props) {
        super(props);
        this.state = { 
            agencys : [],
            amount : 0,
            agencySelected : null,
            isShowModalConfirm : false
        };
    }

    componentDidMount() {
        // this._getData()
        this.setState(oldState => {return({
            ...oldState, amount:this.props.navigation.state.params.amount 
        })})
    }

    _getData = ()=>{

        api.accountAgency({
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            count:20
        },(value)=>{
            let ag=[]

            value.data.map((value,index) => {
                ag.push({
                    agencyId: value.accountId,
                    avataUri: serverResource + value.avataUri,
                    agencyName: value.username,
                    address: value.address,
                    distance: value.distance,
                    latitude: value.latitude,
                    longitude: value.longitude
                })
            })
            console.log(ag)
            this.setState(oldStae=>{return({
                ...oldStae, agencys : ag, loadingStatus: false
            })})
        })
    }

    _showModal = (action) => {
        // console.log(this.state.agencySelected)
        return(this.state.isShowModalConfirm && 
            <ModalConfirm
                header = 'XÁC NHẬN NẠP TIỀN'
                title = {[
                    {leftText: 'Hình thức nạp tiền:', rightText: `Đại Lý ${this.state.agencySelected.agencyName}`},
                    {leftText: 'Số tiền:', rightText: `${this.state.amount}đ`},
                    {leftText: 'Triết khấu:', rightText: '5%'},
                    {leftText: 'Điểm thưởng:', rightText: '5 điểm'},
                    {leftText: 'Lời nhắn:', rightText: this.state.agencySelected.message},
                ]}
                titleFinal = {[
                    {leftText: 'Thanh toán:', rightText: `${this.state.amount}đ`}
                ]}
                textInputDefault = 'Nhập mã giảm giá'
                onClose = {() =>{
                    this.setState(oldState => {
                        return({
                            ...oldState,isShowModalConfirm:false    
                        })
                    })
                }}
                onAction = {action}
            />
        )
    }
    
    render() {
        
        return (
            <View style = {style.root}> 
                <BoxSelectAgency 
                    latitude = {this.props.latitude}
                    longitude = {this.props.longitude}
                    header = 'CHỌN ĐẠI LÝ' 
                    // agencys = {this.state.agencys}
                    onSelect = {(agency) =>{
                        this.setState(oldState => {return({
                            ...oldState, agencySelected: agency
                        })})
                    }}
                />

                <Button text = 'TIẾP THEO' fontSize = {17} height = {50} 
                    onPress = {() => {

                        if (!this.state.agencySelected) return

                        this.setState(oldState => {return({
                            ...oldState, isShowModalConfirm: true
                        })})
                    }}
                />
                {this._showModal(()=>{
                    //Gọi API 
                    //accountId, agencyId, amount, description
                    api.accountPaymentAgency({
                        accountId: this.props.accountId,
                        agencyId: this.state.agencySelected.agencyId,
                        amount: this.state.amount,
                        description: this.state.agencySelected.message
                    },(res)=>{
                        if (res.error===0) {
                            alert (`Bạn sẽ nhận phản hồi của Đại Lý : ${this.state.agencySelected.agencyName} trong phần Thông Báo.`)
                            
                        } else {
                            alert (`Lỗi hệ thống!`)
                        }
                        this.setState(oldState => {return({
                            ...oldState, isShowModalConfirm: false
                        })})
                    })
                })}
            </View>
        )
    };
};

const mapStateToProps = (state) => {
    return { 
        accountId: state.accountId,
        latitude: state.latitude,
        longitude: state.longitude,
    }
}

// const mapDispatchToProps = {
  
// };

export default connect(mapStateToProps)(scrPaymentWalletAgency)

// export default scrPaymentWalletAgency

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
