// Tối ưng lại tất cả các BOX *************
import {
    StyleSheet, 
    View,
    Text
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../utils/theme';

export default class box extends Component {

    static propTypes = {
        header : PropTypes.string,
    };

    static defaultProps = {
        
    }

//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
    }

//------------------------------------------------------------------------------------------

    render() {
        const input = this.props.input;
        return (
            <View style = {[style.root,{flex : this.props.full ? 1 : null}]}>
                {this.props.header ? <Text style = {style.header}> {this.props.header} </Text> : null}
                {this.props.children}
            </View>)
    };
};


const style = StyleSheet.create(
  {
    root : {
        // flex : 1,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent :'flex-start',
        backgroundColor : color.box,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .4,
    },
    header : {
        alignSelf:'center',
        marginBottom:25,
        fontSize:17,
        // fontWeight: 'bold',
        color: color.textDark
    },
  }
)