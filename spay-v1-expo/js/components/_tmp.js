import {StyleSheet, Text,View} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../utils/theme';
export default class name extends Component {
    static propTypes = {

    };    

    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    render() {
        return (
          <View style = {style.popup}>
                {this.props.children}         
          </View>
        )
    };
};
      
const style = StyleSheet.create({
    
})