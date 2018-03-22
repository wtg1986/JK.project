
import {StyleSheet, Text,View,TextInput,Keyboard,TouchableOpacity} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
var _this 
export default class boxInput extends Component {
    static propTypes = {
        header : PropTypes.string,
        input : PropTypes.array, //[{type,default,color,unit,suggest},...]     
    };    
    constructor(props) {
        super(props);
        _this = this;
        _this.state = { 
            // value : [],
            isShowSuggest : false
        };
    }

    componentWillMount () {
        _this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _this._keyboardDidShow);
        _this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _this._keyboardDidHide);
    }

    componentWillUnmount () {
        _this.keyboardDidShowListener.remove();
        _this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow () {
        _this.setState({
                // value : this.state.value,
                isShowSuggest : true
            });
        console.log('Show')
    }

    _keyboardDidHide () {
        _this.setState({
            // value : this.state.value,
            isShowSuggest : false
        });
        console.log('Down')
    }
    

    _renderTextInput (inp,i) {
        return (
            <View key = {i} style ={{
                // backgroundColor:color.textGray, 
                flexDirection:'row',
                marginVertical:2,
                justifyContent :'space-between',}}>
                <TextInput

                    style = {[style.txtInput,{color:inp.color}]}
                    onChangeText = {
                        input => {}
                    }
                    // value = {this.state.value[i]}
                    keyboardType = {inp.type}
                    placeholder = {inp.default}
                    clearTextOnFocus={false}
                    enablesReturnKeyAutomatically={true}
                    selectTextOnFocus={true}
                /> 
                <View style = {{
                    marginRight:20,
                    borderColor:color.primary, 
                    borderBottomWidth:2,
                    justifyContent : 'center'
                }}>
                    <Text style= {{color : color.primary,fontStyle:'italic'}}>{inp.unit}</Text>
                </View>
            </View>
        )
        
    }
    render() {
    
        // const input = this.props.input;

        const input = [{
            type : 'default',
            default : 'Nhap so dt',
            color : color.primary,
            unit :'VNĐ',
            suggest : [10000,20000,50000,100000,50000]
        },
        {
            type : 'default',
            default : 'Nhap so dt',
            color : 'tomato'
        }]

        return (
            <View style = {style.root}>
                <Text style = {{
                    alignSelf:'center',
                    marginBottom:20,
                    fontSize:16,
                    color: color.textDark
                }} >
                    {/* {this.props.header} */}
                    NHẬP SỐ TIỀN MUỐN NẠP
                </Text>
                {
                    input.map((oj,i)=> this._renderTextInput(oj,i))
                }

                {this.state.isShowSuggest&&
                (<TouchableOpacity style = {{position: 'absolute',left : 100,right:100,top:300,height:30}}>
                    <Text>
                        Khanh
                    </Text>
                </TouchableOpacity>)}
            </View>
        )
    };
};

const style = StyleSheet.create(
  {
    root : {
        // flex: 1,
        margin: 15,
        marginTop: 30,
        paddingVertical: 20,
        justifyContent :'flex-start',
        backgroundColor : color.box,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 3,
        shadowOpacity: .6,
    },
    txtInput :{
        flex:1,
        fontSize : 16,
        paddingTop : 5,
        marginLeft: 20,
        height: 40, 
        borderColor: color.primary, 
        borderBottomWidth:2,
        // fontStyle: 'italic',
        // textAlign :'center',
    }
  }
)