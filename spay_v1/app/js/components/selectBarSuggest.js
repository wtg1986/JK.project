
import {StyleSheet,Animated, FlatList, Modal, View,TouchableWithoutFeedback} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import Button from './button';

export default class selectBarSuggest extends Component {
    static propTypes = {
        suggestText : PropTypes.array,
        top : PropTypes.number,
        left : PropTypes.number,
        right : PropTypes.number,
        onSelect : PropTypes.func
    };    
    constructor(props) {
        super(props);
        
        // this.state = { 
        // };
    }

    render() {
        return (
            // <Modal  transparent={true} animationType="slide" >

            //     <View key = {this.props.index} 
            //         style = {[ style.root , {
            //             top : this.props.top, 
            //             left : this.props.left?this.props.left:null, 
            //             right : this.props.right?this.props.right:null,}]}> 

            //         <FlatList
            //             showsHorizontalScrollIndicator = {false}
            //             keyboardShouldPersistTaps ='always'
            //             horizontal = {true}
            //             data = {this.props.suggestText}
            //             renderItem = {
            //                 ({item}) => <Button 
            //                                 onPress = { () => { 
            //                                     this.props.onSelect(item.key) 
            //                                 }} 
            //                                 text = {item.key}
            //                             />
            //             }>
            //         </FlatList>
            //     </View>
            
            // </Modal>
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
                        ({item}) => <Button 
                                        onPress = { () => { 
                                            this.props.onSelect(item.key) 
                                        }} 
                                        text = {item.key}
                                    />
                    }>
                </FlatList>
                
            </Animated.View>
            )
  };
};

const style = StyleSheet.create(
    {
        root : {
            // backgroundColor:'gray', 
            marginVertical: 2,
            flexDirection: 'row',
        }   
    }  
)