
import {StyleSheet, Text,View} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import GirdGroup from '../components/girdGroup';
import Entypo from 'react-native-vector-icons/Entypo';

export default class boxGamePurchase extends Component {
    // static propTypes = {

    // };    
    constructor(props) {
        super(props);
        // this.state = { 
        // };
    }

    render() {
        let ar = Array(12).fill(0)
        return (
            <BoxInput
                header = 'THÔNG TIN CHUYỂN KHOẢN'
                input = {[
                    {key : 'Mobile',
                    type : 'default',
                    default : 'Nhập số điện thoại',
                    color : color.primary,
                    suggest : [{'key':'097.365.1368'},{'key':'096.843.4969'},{'key':'091.272.2282'},]},
                ]}
                onEndEditing = {(res)=>{
                    
                }} 

                onFocus = {(obj)=>{
        
                }}>
                
                <GirdGroup columnCount = {5} elementMargin = {2}>

                    {ar.map((e,i)=>
                        <View key = {i} style ={{
                            borderRadius : 10,
                            borderColor : color.test,
                            borderWidth : 1
                        }}>
                            <Entypo 
                                style ={{textAlign:'center',padding:10}} 
                                name = 'game-controller' 
                                size= {40} 
                                color={color.primary} > 
                            </Entypo>
                        </View>
                    )}
                </GirdGroup>
                
            </BoxInput>
        )
    };
};

const style = StyleSheet.create(
    {
        root : {
            marginTop: 15,
            marginHorizontal: 15,
            paddingVertical: 20,
            justifyContent :'flex-start',
            alignItems: 'center',
            backgroundColor : color.box,
            borderRadius: 10,
            shadowColor: '#929292',
            shadowOffset: { width: .6, height: .6 },
            shadowRadius: 2.5,
            shadowOpacity: .4,
        },
    }
)