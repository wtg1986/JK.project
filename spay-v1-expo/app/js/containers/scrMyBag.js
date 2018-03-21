import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { color } from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrMyBag extends Component {
    static navigationOptions = {
        title :'GIỎ ĐỒ',
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
                    Túi đồ của ban, lưu tất các các code bạn nhận được
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
export default scrMyBag
