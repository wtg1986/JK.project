
import {
    StyleSheet, 
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Animated,
    FlatList,
    Easing
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import Button from '../components/button';

var _this;

export default class boxInput extends Component {


    static propTypes = {
        header : PropTypes.string,
        input : PropTypes.array, // [{type,default,color,unit,suggest},...]  
        // type : Kiểu bàn phím
        // default : Text hướng dẫn nhập
        // color : Màu TextInput
        // unit : Thành phần đơn vị của ô nhập
        // suggest : Dãy text gợi ý cho người nhập
    };    


    constructor(props) {
        super(props);
        _this = this;
        let {height, width} = Dimensions.get('window');
        _this.keyboardHeight = height;
        _this.topSugget = new Animated.Value(height);
        _this.state = { 
            // value : [],
            isShowSuggest : false
        };
    }

    componentWillMount () {
        _this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', _this._keyboardWillShow);
        _this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', _this._keyboardWillHide);
  }

    componentWillUnmount() {
        _this.keyboardWillShowSub.remove();
        _this.keyboardWillHideSub.remove();
    }

    _keyboardWillShow = (event) => {
        _this.setState({
            // value : this.state.value,
            isShowSuggest : true
        });
        Animated.parallel([
            Animated.timing(_this.topSugget, {
                easing: Easing.easeOutElastic,
                duration: event.duration,
                toValue: _this.keyboardHeight - event.endCoordinates.height - 64 - 64,
            }),
        ]).start();
    };

    _keyboardWillHide = (event) => {
        // _this.setState({
        //     // value : this.state.value,
        //     isShowSuggest : false
        // });

        Animated.parallel([
            Animated.timing(_this.topSugget, {
                duration: event.duration,
                toValue: _this.keyboardHeight,
            }),
        ]).start();
    };
    
    _renderTextInput (inp,i) {
        return (
            <View key = {i} style ={{
                // backgroundColor:color.textGray, 
                flexDirection:'row',
                marginVertical:2,
                justifyContent :'space-between',}}>

                {/* TextInput */}
                <TextInput
                    style = {[style.txtInput,{color:inp.color}]}
                    onChangeText = {input => {}}
                    // value = {this.state.value[i]}
                    keyboardType = {inp.type}
                    placeholder = {inp.default}
                    clearTextOnFocus={false}
                    enablesReturnKeyAutomatically={true}
                    selectTextOnFocus={true}
                /> 

                {/* UnitText */}
                <View style = {{
                    marginRight:20,
                    borderColor:color.primary, 
                    borderBottomWidth:2,
                    justifyContent : 'center' }}>
                    <Text style= {{color : color.primary,fontStyle:'italic'}}>{inp.unit}</Text>
                </View>
            </View>
        )
    }


    render() {
    
        const input = this.props.input;

        return (
            <View style = {style.root}>
            
                <Text style = {{
                    alignSelf:'center',
                    marginBottom:20,
                    fontSize:16,
                    color: color.textDark
                }} >
                    {this.props.header}
                </Text>
                {
                    input.map((oj,i)=> this._renderTextInput(oj,i))
                }
                {
                    // this.state.isShwSuggest&&
                    <Animated.View 
                        style={{
                            // backgroundColor:'gray', 
                            position : 'absolute',
                            top : _this.topSugget,
                            left : 0,
                            right : 0,
                            flexDirection: 'row',
                        }}> 
    
                        <FlatList
                            showsHorizontalScrollIndicator = {false}
                            keyboardShouldPersistTaps ='always'
                            horizontal = {true}
                            data = {input[0].suggest}
                            renderItem = {
                                ({item}) => <Button onPress = {(item)=>{alert(item.key)}}
                                text = {item.key}/>
                            }>
                        </FlatList>
                    </Animated.View>
                }

            </View>
        )
    };
};

const style = StyleSheet.create(
  {
    root : {
        // flex: 1,
        margin: 15,
        marginTop: 20,
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