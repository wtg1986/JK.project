//Cần tối ưuuuuuuuuuuuuu!

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
import Button from '../components/button';
import EntypoIcon from 'react-native-vector-icons/Entypo';
// import ViewShot from "react-native-view-shot";

export class scrPaymentWalletQrCode extends Component {
//   static propTypes = {
//     prop: PropTypes
//   };
    static navigationOptions = {
        header :null
    };

    render() {
        const { params } = this.props.navigation.state;
        const { accountId,amount } = params 

        let data =  {
            action:'SEND_MONEY',
            value:{
                accountId: accountId,
                amount: amount
            }
        }
        const value = JSON.stringify(data)

        var base64 = require('base-64');
        var encoded = base64.encode(value);

        return (
            <View style ={{
                flex : 1,
                backgroundColor : color.background,
                padding : 10,
                justifyContent : 'space-between',
                // alignItems : 'center'
            }}>
                <View style = {{flex : 1,justifyContent : 'center',}}>
                    
                    {/* <ViewShot ref="QRCash" options={{ format: "jpg", quality: 0.9 }}> */}
                    {/* <View> */}
                        <View style = {{alignSelf: 'center',}}>
                            <QRCode
                                size = {200} 
                                value = {encoded}
                                logo = {logoSpay}
                                logoSize = {45}
                            />
                        </View>

                        {/* <Text style = {{
                            margin : 10,
                            color: color.textDark,
                            fontSize: 33,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            {data.value.code}
                        </Text> */}
                    {/* </View> */}
                    {/* </ViewShot> */}
                    
                    <Text style = {{
                        margin : 10,
                        color: color.textDark,
                        fontSize: 17,
                        textAlign: 'center'
                        // fontWeight: 'bold'
                    }}>
                        QR-Code nạp tiền giá trị : {amount} vnđ {'\n\n'}
                        <Text style = {{fontStyle:'italic',}}>
                            Chuyển QR Code này cho người khác để thanh toán số tiền này cho bạn.
                        </Text>
                    </Text>
                    <View style ={{marginTop:20, alignSelf: 'center',}}>
                        <Button
                            icon = {<EntypoIcon name = {'save'} size= {32} color={color.secondary}/>}
                            height = {50}
                            width = {200}
                            fontSize = {16}
                            text = 'Lưu ảnh QR-Code'
                            backgroundColor = {color.white}
                            textColor = {color.textGray}
                            onPress = {()=>{
                                // alert('Khanh')
                                // this.refs.QRCash.capture().then(uri => {
                                //     console.log("do something with ", uri);
                                // });
                            }}
                        />
                    </View>
                </View>

                <Button text = 'QUAY LẠI' fontSize = {17} height = {50} 
                    onPress = {()=>{
                        this.props.navigation.goBack()
                    }}
                />

            </View>
        )
    };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrPaymentWalletQrCode
