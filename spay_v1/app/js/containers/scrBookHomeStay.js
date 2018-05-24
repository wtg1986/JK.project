import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { color } from '../utils/theme';
import BoxSelect from '../components/boxSelect';
import BoxInput from '../components/boxInput';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrBookHomeStay extends Component {
    static navigationOptions = {
        title :'ĐẶT HOME STAY',
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
                // alignItems : 'center',
                backgroundColor : color.background
            }}>
                <Text>
                    Dịch vụ đặt phòng home stay cho cặp đôi
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
export default scrBookHomeStay
