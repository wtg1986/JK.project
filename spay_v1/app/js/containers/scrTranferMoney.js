import React, { Component } from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import { color} from '../utils/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import BoxInput from '../components/boxInput';

export class scrTranferMoney extends Component {
    static navigationOptions = {
        title : 'CHUYỂN KHOẢN',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white
    
    };
//   static propTypes = {
//     prop: PropTypes
//   };

  render() {
    return (
        <View style ={{
            flex : 1,
            // justifyContent : 'center',
            // alignItems : 'center',
            backgroundColor : color.background
        }}>

            <BoxInput
                header = 'THÔNG TIN CHUYỂN KHOẢN'
                input = {[
                    {key : 'Mobile',
                    type : 'default',
                    default : 'Nhập số điện thoại',
                    color : color.primary,
                    suggest : [{'key':'097.365.1368'},{'key':'096.843.4969'},{'key':'091.272.2282'},]},

                    {key : 'Money',
                    type : 'default',
                    default : 'Nhập số tiền',
                    color : color.primary,
                    unit : 'VNĐ',
                    suggest : [{'key':'10,000'},{'key':'20,000'},{'key':'50,000'},{'key':'100,000'},
                    {'key':'200,000'},{'key':'500,000'},{'key':'1,000,000'},{'key':'5,000,000'},]},
                    ]}
                onEndEditing = {(res)=>{
                    
                }} 

                onFocus = {(obj)=>{
          
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
export default scrTranferMoney
