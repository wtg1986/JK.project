import {
    StyleSheet, 
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    // Dimensions,
    Animated,
    FlatList,
    Easing,
    Platform
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import Button from '../components/button';
import SelectBarSuggest from '../components/selectBarSuggest';
import ElementSelect  from '../components/elementSelect';

export default class boxInput extends Component {

    static propTypes = {
        header : PropTypes.string,
        input : PropTypes.array, // [{key,type,default,color,unit,suggest},...]  
        onFocus : PropTypes.func,
        onEndEditing : PropTypes.func
        // key : khóa cho data input 
        // type : Kiểu bàn phím
        // default : Text hướng dẫn nhập
        // color : Màu TextInput
        // unit : Thành phần đơn vị của ô nhập
        // suggest : Dãy text gợi ý cho người nhập
    };    

    constructor(props) {
        super(props);
        // let {height, width} = Dimensions.get('window');
        this.textInputComponent = [];
        // this.keyboardHeight = height;
        this.state = { 
            focusIndex : -1,
            value : Array(this.props.input.length).fill(''),
            heightSuggetBar : new Animated.Value(0)
        };
    }

    _onEndEditing = () => {
        let e = { key: this.props.input[this.state.focusIndex].key, 
                value: this.state.value[this.state.focusIndex]} 
        // console.log(e)
        this.props.onEndEditing && this.props.onEndEditing(e)
    }

    _renderTextInput (inp,i) {
        return (
            <View key = {inp.key} style ={{ flexDirection : 'column', justifyContent :'flex-start',}}>

                <View  style ={{
                    // backgroundColor:color.test, 
                    flexDirection : 'row',
                    marginVertical : 2,
                    justifyContent :'space-between',}}>

                    {/* TextInput */}
                    <TextInput 
                        ref = {me => this.textInputComponent[i] = me}
                        style = {[style.txtInput, {color:inp.color}]}
                        onChangeText = {input => {
                            let [ ...newValue ] = this.state.value;
                            newValue[i] = input;
                            this.setState({...this.state, value:newValue})
                        }}
                        onFocus = {() => { 
                            if (this.state.focusIndex !== i )                            
                            Animated.timing(this.state.heightSuggetBar, 
                            {
                                    easing: Easing.easeOutElastic,
                                    duration: 200,
                                    toValue: 0
                            }).start(() => this.setState({...this.state, focusIndex:i},()=>{
                                Animated.timing(this.state.heightSuggetBar, 
                                    {
                                        easing: Easing.easeOutElastic,
                                        duration: 200,
                                        toValue: 43
                                    }).start();
                            }));
                        }}
                        onEndEditing = {() =>{
                            this._onEndEditing()
                            Animated.timing(this.state.heightSuggetBar, 
                            {
                                easing: Easing.easeOutElastic,
                                duration: 200,
                                toValue: 0
                            }).start(() => {
                                // this.setState (oldState => {
                                //     return {...this.state, focusIndex:0}
                                // })
                            } ) 
                        }} 

                        onSubmitEditing = {() => {
                            (i+1) < this.props.input.length && this.textInputComponent[i+1].focus()
                        }}

                        value = {this.state.value[i]}
                        keyboardType = {inp.type ? inp.type : 'default'}
                        placeholder = {inp.default}
                        // clearTextOnFocus = {false}
                        enablesReturnKeyAutomatically = {true}
                        selectTextOnFocus = {true}
                    /> 

                    {/* UnitText */}
                    <View style = {{
                        marginRight:20,
                        borderColor:color.primary, 
                        borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
                        justifyContent : 'center' }}>
                        <Text style= {{color : color.primary,fontStyle:'italic'}}>{inp.unit}</Text>
                    </View>

                </View>
                
                {inp.suggest && this.state.focusIndex === i && 
                <SelectBarSuggest
                    suggestText = {inp.suggest}
                    height = {this.state.heightSuggetBar}
                    onSelect = {(select)=>{
                        let [ ...newValue ] = this.state.value;
                        newValue[i] = select;
                        this.setState({...this.state, value:newValue})
                    }}
                />}

            </View>
        )
    }

    render() {
        const input = this.props.input;
        return (
            <View style = {style.root}>
                <Text style = {style.header}> {this.props.header} </Text>
                {input.map((oj,i)=> this._renderTextInput(oj,i))}
                {this.props.children}
            </View>)
    };
};

const style = StyleSheet.create(
  {
    root : {
        marginTop: 15,
        marginHorizontal: 15,
        paddingVertical: 20,
        justifyContent :'flex-start',
        backgroundColor : color.box,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .4,
    },
    header : {
        alignSelf:'center',
        marginBottom:20,
        fontSize:16,
        color: color.textDark
    },
    txtInput :{
        flex:1,
        fontSize : 18,
        paddingTop : 5,
        marginLeft: 20,
        height: 40, 
        borderColor: color.primary, 
        borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
        // fontStyle: 'italic',
        // textAlign :'center',
    }
  }
)