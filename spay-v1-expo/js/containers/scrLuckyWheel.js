import React, { Component } from 'react';
import {View,Text,WebView} from 'react-native';
import { color } from '../utils/theme';
import {endpoint} from '../../assets';
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
                backgroundColor : color.background
            }}> 
                <WebView
                    // startInLoadingState = {true}
                    scalesPageToFit = {true}
                    scrollEnabled = {false}
                    source ={{uri: endpoint + '/htmls/index.html'}}
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
export default scrLuckyWheel
