import React, { Component } from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import { color} from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import BoxInput from '../components/boxInput';
export class scrProfile extends Component {
    static navigationOptions = {
        title : 'THÔNG TIN TÀI KHOẢN',
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
                backgroundColor : color.background
            }}>
                <BoxInput
                    header = ''
                    input = {[
                        {key : 'Money',
                        type : 'default',
                        default : 'Nhập số tiền',
                        color : color.primary,
                        },
                    ]}
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
export default scrProfile
