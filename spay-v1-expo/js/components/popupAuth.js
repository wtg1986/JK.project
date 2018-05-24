import {
    StyleSheet, 
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Dimensions
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../utils/theme';
import InputPincode from './inputPincode';
import Button from '../components/button';
import { Switch } from 'react-native-gesture-handler';
// import {Constants} from 'expo';
import PasswordStrength from '../utils/passwordStrength';

const { width: wWidth } = Dimensions.get('window');

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
            rePass:false,
            isValidPass:false,
            txtDesc: this.props.txtDescription
        };
        // console.log(wWidth)
    }

//------------------------------------------------------------------------------------------

    _renderInput = () => {
        switch (this.props.enumInputType) {
            
            case 'NUMBER' :
            case 'PASS_LOGIN' :
                return <View style ={style.txtInputWrapper}>
                            <TextInput
                                style = {style.txtInput}
                                onChangeText = {(input)=>{
                                    this.setState(oldState => {return({...oldState, inputValue:input})})
                                }}
                                autoCorrect = {false}
                                underlineColorAndroid = 'transparent'
                                value= {this.state.inputValue}
                                keyboardType = {this.props.enumInputType === 'NUMBER' ? 'phone-pad' : 'default'}
                                secureTextEntry = {this.props.enumInputType === 'PASS_LOGIN'}
                                autoFocus = {this.props.autoFocus}
                                clearTextOnFocus={false}
                            />
                        </View>
            case 'PASS_REGISTER':

                const strengthLevels = [
                    {
                        label: 'Mật khẩu không đúng quy định',
                        labelColor: '#929292',
                        widthPercent: 25,
                        innerBarColor: '#e61610'
                    },
                    {
                        label: 'Mật khẩu không đúng quy định',
                        labelColor: '#929292',
                        widthPercent: 25,
                        innerBarColor: '#e61610'
                    },
                    {
                        label: 'Mật khẩu đúng quy định',
                        labelColor: '#929292',
                        widthPercent: 50,
                        innerBarColor: '#ffa834'
                    },
                    {
                        label: 'Mật khẩu bảo mật tốt',
                        labelColor: '#929292',
                        widthPercent: 75,
                        innerBarColor: '#c1d045'
                    },
                    {
                        label: 'Mật khẩu bảo mật mạnh',
                        labelColor: '#929292',
                        widthPercent: 100,
                        innerBarColor: '#72bb53'
                    }
                ];

                return  this.state.rePass ?
                        <View style ={style.txtInputWrapper}>
                            <TextInput
                                style = {style.txtInput}
                                onChangeText = {(input)=>{
                                    this.setState(oldState => {return({...oldState, inputValue:input})})
                                }}
                                autoCorrect = {false}
                                underlineColorAndroid = 'transparent'
                                value = {this.state.inputValue}
                                keyboardType = 'default'
                                secureTextEntry = {true}
                                autoFocus = {this.props.autoFocus}
                                clearTextOnFocus={false}
                            />
                        </View> :
                        <View style ={{marginBottom: 40,}}>
                            <PasswordStrength
                                style = {[style.txtInput, {borderBottomWidth:0}]}
                                secureTextEntry ={true}
                                minLength={4}
                                ruleNames='symbols|words|digits'
                                ruleDescription = 'Mật khẩu cần có tối thiểu 6 ký tự bao gồm ít nhất một chữ số và một ký tự đặc biệt.'
                                strengthLevels={strengthLevels}
                                // tooShort={tooShort}
                                minLevel={0}
                                barWidthPercent={100}
                                showBarOnEmpty={true}
                                barColor = {color.textGray}
                                inputStyle = {{color : color.textGray}}
                                autoFocus = {this.props.autoFocus}
                                onChangeText = {(pass, isValid) => {
                                    console.log(pass,isValid)
                                    this.setState(oldState => {return ({
                                        ...oldState, isValidPass: isValid, inputValue: pass
                                    })})
                                }} /> 
                        </View>
               
            case 'PIN_CODE':
                return <View style ={{marginBottom: 30,marginTop: 10}}> 
                            <InputPincode numberCount = {6}
                                onEndEditing = {(pin) =>{
                                    this.setState(oldState => {return ({
                                        ...oldState, inputValue: pin
                                    })})
                                }}
                            /> 
                        </View>
        }
    }

//------------------------------------------------------------------------------------------


    _pass = null;

    render() {
        return (
        
        <View style = {style.popup}>
            
            <Image style={style.imgLogoSpay} source={this.props.imgLogo}/>

            <View>
                <Text style = {[style.textComment,{marginTop: 15,}]}>{this.props.txtNotification}</Text>
                {this.props.enumInputType !== 'PIN_CODE' &&
                <Text style = {[style.textComment,{marginTop: 20, marginBottom: 3,}]}>{this.state.txtDesc}</Text>
                }
                { this._renderInput() }
                
            </View>
           
            <View>
                <Button
                    text = 'TIẾP TỤC'
                    fontSize = {17}
                    marginHorizontal = {10}
                    height = {50}
                    onPress = {() => {
                        
                        if (this.props.enumInputType === 'PASS_REGISTER') {
                            if (this._pass) {

                                if (this._pass === this.state.inputValue) {
                                    this.props.onAction(this.state.inputValue)
                                } else {
                                    this.setState(oldState => {return({
                                        ...oldState, inputValue: '', txtDesc: this.props.txtDescription, rePass: false, isValidPass: false
                                    })}) 
                                    this._pass = null;
                                    Alert.alert('THÔNG BÁO','Bạn nhập lại mật khẩu không khớp, hãy nhập lại từ đầu.')
                                }

                            } else {
                                if (!this.state.isValidPass) {
                                        Alert.alert('THÔNG BÁO','Bạn đặt mật khẩu không đúng quy định, hãy xem quy định và đặt lại mật khẩu.')
                                    }
                                else {
                                    this._pass = this.state.inputValue
                                    this.setState(oldState => {return({
                                        ...oldState, inputValue: '', txtDesc: 'Nhập lại mật khẩu', rePass: true
                                    })}) 
                                }
                            }
                        } else {
                            // if (!this.state.inputValue) 
                            //     Alert.alert('THÔNG BÁO', 'Bạn nhập liệu chưa đúng')
                            // else 
                                this.props.onAction(this.state.inputValue)
                        }
                    }} 
                />
            </View>

            {this.props.onBack&&
            <TouchableOpacity onPress = {() => {this.props.onBack()}}>
                <Text style = {{
                    color : color.textGray,
                    fontStyle : 'italic',
                    fontSize : 14,
                    alignSelf :'center', 
                    marginVertical : 15,
                    textDecorationLine : 'underline'
                }}>{this.props.txtHyperlink1}</Text>
            </TouchableOpacity>}
            
        </View>
    )
  };
};

//------------------------------------------------------------------------------------------

const style = StyleSheet.create(
  {
    imgLogoSpay :{
        alignSelf: 'center',
        marginTop: 25,
        height: 68,
        resizeMode: 'contain',
        marginBottom: 5
    },
    textComment :{
        width: 330,
        alignSelf: 'center',
        color: color.textGray,
        fontSize: wWidth<=320 ? 14.5: 17,
        alignContent: 'center',
        textAlign : 'center',
    },
    popup : {
        flex: 1,
        height : 360,
        justifyContent :'flex-start',
        backgroundColor : color.box,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .4,
    },
    txtInputWrapper:{  
        borderColor: color.textGray,
        borderBottomWidth: 2,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 40
    },
    txtInput:{
        fontSize : 24,
        paddingTop : 5,
        height: 40, 
        color : color.primary, 
        textAlign :'center',
    },
  }
)