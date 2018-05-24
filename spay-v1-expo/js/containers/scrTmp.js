import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { color } from '../utils/theme';
import ElementAgency from '../components/elementAgency';
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
                // alignItems : 'center'
            }}>
                <ElementAgency/>
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
