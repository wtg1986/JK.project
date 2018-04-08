import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { color } from '../utils/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrBuyCardCode extends Component {
    static navigationOptions = {
        title :'MUA THẺ CÀO',
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
                    Sử dụng ví Spay để mua mã thẻ viễn thông và mã thẻ game với tỉ lệ chiết khấu cao
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
export default scrBuyCardCode
