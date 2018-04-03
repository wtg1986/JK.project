import React, { Component } from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import { color } from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import BoxGamePurchase from '../components/boxGamePurchase';

export class scrPaymentGame extends Component {
    static navigationOptions = {
        title : 'NẠP TIỀN VÀO GAME',
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
            <BoxGamePurchase
                onChangeInput = {res => {
                    // console.log (res)
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
export default scrPaymentGame
