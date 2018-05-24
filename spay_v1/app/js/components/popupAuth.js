import {
    StyleSheet, 
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../utils/theme';
import InputPincode from './inputPincode';
import Button from '../components/button';

export default class popupAuth extends Component {

//------------------------------------------------------------------------------------------

    static propTypes = {
        // imgLogo: PropTypes.string.,
        // txtNotification: PropTypes.string,
        txtDescription: PropTypes.string,
        txtInputDefault: PropTypes.string,
        txtButon: PropTypes.string,
        txtHyperlink1: PropTypes.string,
        txtHyperlink2: PropTypes.string,
        btnRefresh: PropTypes.object,
        enumInputType: PropTypes.string,
        autoFocus : PropTypes.bool
    };    

//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
        this.state = { 
            inputValue: '',
        };
    }

//------------------------------------------------------------------------------------------

  render() {
    return (
    
        <View style = {style.popup}>
            
            <Image style={style.imgLogoSpay} source={this.props.imgLogo}/>

            <View>
                <Text style = {style.textComment}>{this.props.txtNotification}</Text>
                {
                    this.props.txtDescription ?
                        <Text style = {style.textComment}>{this.props.txtDescription}</Text> : null
                }
                { 
                    (this.props.enumInputType === 'PASS' || this.props.enumInputType === 'NUMBER' )?
                        <TextInput
                            style = {style.txtInput}
                            onChangeText = {(input)=>{
                                this.setState(oldState => {return({...oldState, inputValue:input})})
                            }}
                            autoCorrect = {false}
                            underlineColorAndroid = 'transparent'
                            value= {this.state.inputValue}
                            keyboardType = {this.props.enumInputType === 'NUMBER' ? 'numeric' : 'default'}
                            secureTextEntry = {this.props.enumInputType === 'PASS'}
                            autoFocus = {this.props.autoFocus}
                            clearTextOnFocus={false}
                        /> : (this.props.enumInputType === 'PIN_CODE' ?
                             <InputPincode numberCount = {6}/> : null)
                }
            </View>
           
            <Button
                text = 'TIẾP TỤC'
                fontSize = {17}
                marginHorizontal = {20}
                height = {50}
                onPress = {() => {this.props.onAction(this.state.inputValue)}} 
            />

            <TouchableOpacity onPress = {() => {this.props.onBack(this.state.inputValue)}}>
                <Text style = {{
                    color : color.textGray,
                    fontStyle : 'italic',
                    fontSize : 14,
                    alignSelf :'center', 
                    marginVertical : 10,
                    textDecorationLine : 'underline'
                }}>{this.props.txtHyperlink1}</Text>
            </TouchableOpacity>   
            
        </View>
    )
  };
};

//------------------------------------------------------------------------------------------

const style = StyleSheet.create(
  {
    imgLogoSpay :{
        alignSelf: 'center',
        marginTop: 30,
        height: 110,
        resizeMode: 'contain'
    },
    textComment :{
        width: 300,
        alignSelf: 'center',
        paddingBottom: 15,
        color: color.textGray,
        fontSize: 17,
        alignContent: 'center',
        textAlign : 'center',
    },
    popup : {
        flex: 1,
        height : 410,
        paddingVertical: 20,
        justifyContent :'space-between',
        backgroundColor : color.box,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .4,
    },
    txtInput:{
        fontSize : 24,
        paddingTop : 5,
        marginLeft: 25,
        marginRight: 25,
        height: 40, 
        borderColor: color.primary, 
        borderBottomWidth:2,
        color : color.primary, 
        textAlign :'center',
    },
  }
)