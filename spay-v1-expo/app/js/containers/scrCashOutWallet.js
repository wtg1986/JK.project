import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { color } from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrCashOutWallet extends Component {
//   static propTypes = {
//     prop: PropTypes
//   };
    static navigationOptions = {
        title :'RÚT TIỀN VÍ',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white
    };
    render() {
        return (
            <View style ={{
                flex : 1,
                justifyContent : 'center',
                alignItems : 'center',
                backgroundColor : color.background
            }}>
                <Text>
                    Rút tiền từ Ví Spay về tài khoản ngân hàng.
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
export default scrCashOutWallet
