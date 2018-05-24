import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { color } from '../utils/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrQRCodeScanHelp extends Component {
//   static propTypes = {
//     prop: PropTypes
//   };
    static navigationOptions = {
        title : 'QUÉT QR-CODE ĐỂ LÀM GÌ ?',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };
    render() {
        const helpText = 
            `Rất nhiều điều bạn có thể làm từ việc quét mã QR-Code.

    1. Nạp tiền vào ví từ những mã QR-Code bạn có được.


    2. Thanh toán hàng hóa hoặc trả tiền người khác.


    3. Tìm kiếm QR-Code Fly, rất nhiều phần quà hấp dẫn theo địa điểm. Hãy quét để nhận quà.
    
    
    
Cách sử dụng: đưa hình ảnh mã QR-Code vào Camera điện thoại, hệ thống sẽ tự động nhận dạng mã QR-Code`
        
        return (
            <View style ={{
                flex : 1,
                backgroundColor : color.background,
                padding : 10,
                justifyContent : 'center',
                alignItems : 'center'
            }}>
                 <Text style = {{color: color.textDark, fontSize:18,fontStyle:'italic'}} >
                    {helpText}
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
export default scrQRCodeScanHelp
