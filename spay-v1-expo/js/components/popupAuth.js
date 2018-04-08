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
    constructor(props) {
        super(props);
        this.state = { 
            inputValue: '',
        };
        console.log(this.props.imgLogo)
    }

  render() {
    return (
    
        <View style = {style.popup}>
            {/* <KeyboardAvoidingView behavior = "position"> */}
            <Image 
                style={style.imgLogoSpay} 
                source={this.props.imgLogo}
            />
            <View>
                <Text style = {style.textComment} > 
                    {this.props.txtNotification}
                </Text>
                {
                    this.props.txtDescription ?
                        <Text style = {style.textComment} > 
                            {this.props.txtDescription}
                        </Text> : null
                }
                { 
                    (this.props.enumInputType === 'PASS' || this.props.enumInputType === 'NUMBER' )?
                        <TextInput
                            style = {style.txtInput}
                            onChangeText = {(input)=>{
                                this.setState(oldState => {return({
                                    ...oldState, inputValue:input
                                })})
                            }}
                            valu e= {this.state.inputValue}
                            keyboardType = {this.props.enumInputType === 'NUMBER' ? 'numeric' : 'default'}
                            secureTextEntry = {this.props.enumInputType === 'PASS'}
                            autoFocus = {this.props.autoFocus}
                            // placeholder = {this.props.txtInputDefault}
                            clearTextOnFocus={false}
                            // defaultValue ='Khanh'
                            // enablesReturnKeyAutomatically={true}
                            // selectTextOnFocus={true}
                        /> : 
                    ( this.props.enumInputType === 'PIN_CODE' ?
                        <InputPincode numberCount = {6} />
                    :null )
                }
            </View>
            {/* <TouchableOpacity style = {style.btnTiepTuc}
                onPress = {(e) => {
                    this.props.onAction(e)
                }} 
            >
                <Text style = {{
                    color : color.white,
                    fontWeight :'bold',
                    fontSize : 17,
                    alignSelf :'center', 
                }}>{this.props.txtButon}</Text>
            </TouchableOpacity> */}

            <Button
                text = 'TIẾP TỤC'
                fontSize = {17}
                marginHorizontal = {20}
                height = {50}
                onPress = {(e) => {
                    this.props.onAction(this.state.inputValue)
                }} 
            />

            <TouchableOpacity>
                <Text style = {{
                    color : color.textGray,
                    fontStyle : 'italic',
                    fontSize : 14,
                    alignSelf :'center', 
                    marginBottom : 15,
                    textDecorationLine : 'underline'
                }}>{this.props.txtHyperlink1}</Text>
            </TouchableOpacity>   
            {/* </KeyboardAvoidingView> */}
        </View>
    
    )
  };
};

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
    //   fontWeight: 'bold',
      alignContent: 'center',
      textAlign : 'center',
    //   paddingTop: 20,
    //   backgroundColor: '#CECECE',
    },
    popup : {
        flex: 1,
        height : 410,
        marginTop: 15,
        marginHorizontal: 15,
        paddingVertical: 20,
        // alignSelf: 'center',
        // alignItems: 'center',
        justifyContent :'space-between',
        backgroundColor : color.box,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .4,
      },

    btnTiepTuc:{
        justifyContent : 'center',
        height : 50,
        width : 300,
        alignSelf: 'center',
        // marginBottom: 25,
        backgroundColor : color.primary,
        borderRadius: 25,
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
        color : color.primary, //'#929292',
        // fontStyle: 'italic',
        textAlign :'center',
        
        // backgroundColor : '#FFA833',
    },
  }
)