import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { color } from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrLuckyWheel extends Component {
    static navigationOptions = {
        title :'VÒNG QUAY MAY MẮN',
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
                justifyContent : 'center',
                alignItems : 'center',
                backgroundColor : color.background
            }}>
                <Text>
                    Quay tay thật nhiều để nhận được nhiều gifcode hấp dẫn
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
export default scrLuckyWheel
