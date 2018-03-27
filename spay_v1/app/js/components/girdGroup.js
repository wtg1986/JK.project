
import {StyleSheet, Text,View} from 'react-native';
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';

export default class girdGroup extends Component {
    static propTypes = {
        columnCount : PropTypes.number,
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
        let row = Array(Math.floor(childs.length / this.props.columnCount) + 1).fill(0)
        let col = Array(this.props.columnCount).fill(0)
        
        let ij = 0
        return (
            <View style = {style.col}>
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
            justifyContent: 'flex-start',
            flexDirection: 'row',
        },
        col : {
            // backgroundColor : color.textGray,
            justifyContent: 'flex-start',
            flexDirection: 'column',
            // marginHorizontal: 15
        },
        element : {
            // backgroundColor : color.test,
            alignItems: 'center',
            // flex :1
        }
    }
)