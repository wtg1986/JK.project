import {
    View,
    Text
} from 'react-native';
import React, { Component } from 'react';
import { color } from '../utils/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {logoSpay} from '../../assets';

export class scrCashOutWalletCode extends Component {
//   static propTypes = {
//     prop: PropTypes
//   };
    static navigationOptions = {
        title : 'MÃ RÚT TIỀN',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };

    render() {
        // dates (years, months, days, hours, minutes, seconds, and milliseconds)
        let data =  {
            action:'CODE_MONEY',
            value:{
                code : '213231543',
                expDate: '10/04/2018',
                amount: 500000
            }
        }
        // let data =  {
        //     action:'SEND_MONEY',
        //     value:{
        //         accountId: 13,
        //         amount: 500000
        //     }
        // }
        // let data =  {
        //     action:'PURCHASE_SERVICE',
        //     value:{
        //         serviceId : 10,
        //         amount: 500000
        //     }
        // }

        const value = JSON.stringify(data)

        var base64 = require('base-64');
        var utf8 = require('utf8');
        
        var bytes = utf8.encode(value);
        var encoded = base64.encode(bytes);

        return (
            <View style ={{
                flex : 1,
                backgroundColor : color.background,
                padding : 10,
                justifyContent : 'center',
                alignItems : 'center'
            }}>
                <QRCode
                    size = {200} 
                    value = {encoded}
                    logo = {logoSpay}
                    logoSize = {45}
                />
                <Text style = {{
                    margin : 10,
                    color: color.textDark,
                    fontSize: 33,
                    fontWeight: 'bold'
                }}>
                    {data.value.code}
                </Text>

                <Text style = {{
                    margin : 10,
                    color: color.textDark,
                    fontSize: 17,
                    textAlign: 'center'
                    // fontWeight: 'bold'
                }}>
                    Giá trị của mã rút tiền : {data.value.amount} vnđ {'\n\n'}
                    <Text style = {{fontStyle:'italic',}}>
                        Đem mã này đến các Đại Lý Spay để nhận tiền.
                    </Text>
                </Text>


            </View>
        )
    };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrCashOutWalletCode
