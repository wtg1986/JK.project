import React, { Component } from 'react';
import {Text, 
        View, 
        StyleSheet,} from 'react-native';
import { color } from '../utils/theme';
import Button from '../components/button';
import BoxSelectAgency from '../components/boxSelectAgency';
import * as api from '../utils/api';
// import SvgUri from 'react-native-svg-uri'
// import WImage from '../components/fullWidthImage';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {serverResource} from '../utils/global';

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
            agencys : []
        };
        
    }

    componentWillMount() {
        this._getData()
    }

    _getData = ()=>{
        api.accountAgency({
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            count:20
        },(value)=>{
            let ag=[]
            // console.log(value)
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
            // console.log(ag)
    
            this.setState(oldStae=>{return({
                ...oldStae, agencys : ag
            })})
        })
    }
    
    render() {
        
        return (
            <View style = {style.root}> 
                <BoxSelectAgency header = 'CHỌN ĐẠI LÝ' agencys = {this.state.agencys}/>
                <Button text = 'TIẾP THEO' fontSize = {17} height = {50} 
                    onPress = { () => {

                    }}
                />
            </View>
        )
    };
};

const mapStateToProps = (state) => {
    return { 
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
