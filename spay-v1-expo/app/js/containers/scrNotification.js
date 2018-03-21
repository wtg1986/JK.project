import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { color } from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrNotification extends Component {
    static navigationOptions = {
        header :null
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
                    Danh sách tin tức từ Spay gửi tới User
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
export default scrNotification
