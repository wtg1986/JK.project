
import {
    StyleSheet,
    Animated, 
    FlatList, 
    View,
    TouchableWithoutFeedback
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import {color} from '../utils/theme';

//------------------------------------------------------------------------------------------

export default class selectBarSuggest extends Component {

    static propTypes = {
        suggestText : PropTypes.array,
        top : PropTypes.number,
        left : PropTypes.number,
        right : PropTypes.number,
        onSelect : PropTypes.func,
    };    
    
//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
            this.state = { 
        };
    }

//------------------------------------------------------------------------------------------

    render() {
        return (
            <Animated.View 
                key = {this.props.index}
                style = {[ style.root , {
                    top : this.props.top?this.props.top:null,  
                    left : this.props.left?this.props.left:null, 
                    right : this.props.right?this.props.right:null,
                    height : this.props.height}]}> 
                <FlatList
                    showsHorizontalScrollIndicator = {false}
                    keyboardShouldPersistTaps ='always'
                    horizontal = {true}
                    data = {this.props.suggestText}
                    renderItem = {
                        ({item}) => 
                            <Button 
                                marginVertical = {5}
                                marginHorizontal = {5}
                                onPress = {() => this.props.onSelect(item.key)} 
                                text = {item.key}
                            />
                    }/>
            </Animated.View>
        )
  };
};

//------------------------------------------------------------------------------------------

const style = StyleSheet.create(
    {
        root : {
            // backgroundColor:'gray', 
            marginVertical: 2,
            flexDirection: 'row',
        }   
    }  
)