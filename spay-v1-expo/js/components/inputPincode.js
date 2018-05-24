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
            inputEable : ar,
            inputPart : Array(this.props.numberCount).fill(' ')
        }
    }

//------------------------------------------------------------------------------------------

    // Sự kiện nhập kí tự vào textinput
    _onChangeInput = (input) =>
    {
        if (input.length === 2 && this.state.inputIndex < this.props.numberCount) {
            this.setState(oldState => {return({
                ...oldState, 
                inputIndex: oldState.inputIndex + 1,
                inputPart : oldState.inputPart.map((v,key) => {
                                return (oldState.inputIndex === key) ? input: v;
                            }),       
                inputEable : oldState.inputEable.map((v,key)=>{
                                return (oldState.inputIndex + 1 === key || key === this.props.numberCount - 1) ? true : false;
                            }),  
            })},() => {
                if (this.state.inputIndex < this.props.numberCount)
                    this._pinputs[this.state.inputIndex].focus()
                else {
                    let result = ''
                    this.state.inputPart.forEach(element => {
                        result += element
                    });
                    result = result.replace(/ /g,'')
                    // console.log(result)
                    
                    this.props.onEndEditing && this.props.onEndEditing(result)
                }
            })
        }

        if (input.length <= 1 && this.state.inputIndex >0) {
            this.setState(oldState => {return({
                ...oldState, 
                inputIndex: oldState.inputIndex - 1,
                inputPart : oldState.inputPart.map((v,key) => {
                                return (oldState.inputIndex === key || 
                                        oldState.inputIndex - 1 === key ) ? ' ': v;
                            }), 
                inputEable : oldState.inputEable.map((v,key)=>{
                                return (oldState.inputIndex - 1 === key) ? true : false;
                            }),  
            })},()=>{
                this._pinputs[this.state.inputIndex].focus()
            })
        }
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
                maxLength = {2}
                editable = {this.state.inputEable[i]}
                autoFocus = {i===0 ? true : false}
                value = {this.state.inputPart[i]}
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