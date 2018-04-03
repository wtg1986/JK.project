// AIzaSyA7oR3gaCzIsBFqR5JfssUXYjtgsPgNChI  -ios
// AIzaSyDxrS6mzdCtaxBv25KiuRtrD4o4muIjC5s  -android
import {StyleSheet, Text,View} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
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