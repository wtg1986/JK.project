import React, { Component } from 'react';
import {View} from 'react-native';
import { color } from '../utils/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrName extends Component {
//   static propTypes = {
//     prop: PropTypes
//   };
    static navigationOptions = {
        header :null
    };
    render() {
        return (
            <View style ={{
                flex : 1,
                backgroundColor : color.background,
                padding : 10,
                justifyContent : 'center',
                alignItems : 'center'
            }}>
                <Text>
                    New Screen
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
export default scrName
