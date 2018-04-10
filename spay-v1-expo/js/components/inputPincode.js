import { 
    View,
    TextInput,
    StyleSheet 
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class inputPincode extends Component {

    constructor(props) {
        super(props);
        let ar = Array(this.props.numberCount).fill(false)
        ar[0] = true
        this.state = { 
            pincode : '',
            inputIndex : 0,
            inputEable : ar
        }
    }

//------------------------------------------------------------------------------------------

    // Sự kiện nhập kí tự vào textinput
    _onChangeInput = (input) =>
    {
        let inpIndexInc = 1
        this.setState (oldState => ({
            inputIndex : oldState.inputIndex + inpIndexInc,
            inputEable : oldState.inputEable.map((v,key)=>{
                return (oldState.inputIndex + inpIndexInc === key) ? true : false;
            }),
            pincode : oldState.pincode + input}),()=>
            {
                if (this.state.inputIndex < this.props.numberCount)
                {
                    this._pinputs[this.state.inputIndex].focus()
                } else {
                    alert (this.state.pincode)
                }
            })
    }

//------------------------------------------------------------------------------------------

    //Hàm render component TextInput 
    _renderInputNumber = () => {
        return (
            Array(this.props.numberCount).fill(0).map((v,i) =>
            <TextInput
                key = {i}
                ref = {cpn => { this._pinputs[i] = cpn }}
                autoCorrect = {false}
                underlineColorAndroid = 'transparent'
                style = {style.txtPinInput}
                keyboardType='numeric'
                maxLength = {1}
                editable = {this.state.inputEable[i]}
                autoFocus = {i===0 ? true : false}
                // value =' '
                // selectTextOnFocus={true}
                onChangeText={this._onChangeInput}>
            </TextInput>)
        )
    }

//------------------------------------------------------------------------------------------
    
    _pinputs = [];
    
    render() {
        return (
            <View style = {style.root}>
                {this._renderInputNumber()}
            </View> 
        )
  };
};

//------------------------------------------------------------------------------------------

const style = StyleSheet.create(
    {
        root:{
            flexDirection:'row',
            justifyContent:'space-around', 
            marginTop:10 ,
            height:48 ,
            // backgroundColor:'#CECECE',
            marginRight : 20,
            marginLeft : 20
        },
        txtPinInput:{
            backgroundColor:'#f7f6f6',
            color:'#272727',
            width : 36,
            borderRadius : 6,
            borderWidth : 1,
            borderColor : '#D6D6D6',
            textAlign : 'center',
            fontSize : 26,
        }
    })