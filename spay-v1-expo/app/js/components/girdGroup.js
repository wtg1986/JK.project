
import {StyleSheet, Text,View} from 'react-native';
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';

export default class girdGroup extends Component {
    static propTypes = {
        columns : PropTypes.number,
        // rowCount : PropTypes.number,
        elementMargin: PropTypes.number
    };    
    constructor(props) {
        super(props);
        // this.state = { 
        // };
    }
    
    render() {
        let childs = []
        Children.map(this.props.children, (child,index) => {childs[index]=child})
        let row = Array(Math.floor(childs.length / this.props.columns) + 1).fill(0)
        let col = Array(this.props.columns).fill(0)
        
        let ij = 0
        return (
            <View style = {[this.props.style,{flexDirection: 'column',}]}>
                {
                row.map((oj,i) => 
                    <View key ={i} style ={[style.row, {marginVertical : this.props.elementMargin}]}>
                        {col.map(() => 
                            <View key = {ij} style = {[style.element, {marginHorizontal : this.props.elementMargin}]}> 
                                {childs[ij++]} 
                            </View>)
                        }
                    </View>)
                }
            </View>
        )
    }
};

const style = StyleSheet.create(
    {
        row : { 
            // backgroundColor : color.textGray,
            // justifyContent: 'flex-start',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
        },
        
        element : {
            // backgroundColor : color.test,
            alignItems: 'center',
            // flex :1
        }
    }
)