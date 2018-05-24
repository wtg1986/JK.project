import {
    StyleSheet, 
    Text, 
    View, 
    Image,
    Modal,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../utils/theme';
import Box from '../components/box';
import {imgGiftBox} from '../../assets';
import Button from '../components//button';

export default class modalShareFriends extends Component {
    
    static propTypes = {
        // shareIcon : 
        shareCode : PropTypes.string,
        shareDescription : PropTypes.string,
        onClose : PropTypes.func,
        onDone : PropTypes.func
    };    

//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
        this.state = { 
            isFocusInput : false
        };
    }

//------------------------------------------------------------------------------------------    

    render() {
        return (
            <Modal transparent = {true} animationType = 'slide'>
                <View style ={{flex:1,paddingHorizontal:10, justifyContent:'center',backgroundColor:'rgba(0,0,0,.5)' }}>
                    <KeyboardAvoidingView behavior="position">
                    <Box>
                        <View style ={{justifyContent:'center',}}>

                            <Image style ={{width : 96, height: 96,alignSelf:'center'}}
                                source = {imgGiftBox}
                            />
                            
                            <View style ={{
                                flexDirection:'row',
                                borderColor:color.textGray,
                                borderWidth:1,
                                borderRadius:10,
                                marginHorizontal: 30,
                                marginVertical:20,
                            }}>
                                <View style = {{
                                    flex:1,
                                    height:54,
                                    justifyContent:'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style = {{
                                        fontSize:26,
                                        fontWeight:'bold',
                                        color:color.primary,
                                    }}>AB67EF54CC</Text>
                                </View>

                                <View style={{
                                    backgroundColor:color.primary,
                                    borderTopRightRadius:9,
                                    borderBottomRightRadius:9,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    paddingHorizontal: 15,
                                    shadowColor: '#929292',
                                    shadowOffset: { width: .6, height: .6 },
                                    shadowRadius: 2.5,
                                    shadowOpacity: .5,
                                }}>
                                    <Text style ={{
                                        fontSize:18,
                                        fontWeight:'bold',
                                        color:color.white
                                    }}>
                                        MỜI
                                    </Text>
                                </View>
                                
                            </View>
                            <Text style ={{
                                backgroundColor : color.white,
                                position:'absolute',
                                top:107,
                                left:50,
                                fontSize:14,
                                color:color.textGray
                            }}>
                                    Mã giới thiệu của bạn:
                            </Text>
                            
                            <View style = {{
                                height:50,
                                marginHorizontal:25,
                                marginBottom:20,
                                borderBottomWidth:1,
                                borderBottomColor:color.shadow,
                            }}>
                                <Text style = {{
                                    textAlign:'center',
                                    fontStyle:'italic',
                                    fontSize:15,
                                    color: color.textDark,
                                }}>
                                    Mời bạn bè dùng ví Spay. Cả bạn và họ sẽ nhận được 5,000 VNĐ !
                                </Text>
                            </View>

                            <Text style = {{
                                    textAlign:'center',
                                    fontSize:15,
                                    color: color.textDark,
                                    marginVertical:15
                                }}>
                                    Mã giới thiệu bạn nhận được
                            </Text>

                            <TextInput 
                                // ref = {me => this.textInputComponent[i] = me}
                                autoCorrect = {false}
                                underlineColorAndroid = 'transparent'   
                                style = {{
                                    fontSize : 18,
                                    paddingHorizontal: 5.5,
                                    marginHorizontal:25,
                                    height: 40, 
                                    borderColor: this.state.isFocusInput ? color.primary : color.textGray, 
                                    color : color.primary,
                                    borderBottomWidth: 2, // Platform.OS === 'ios' ? 2 : 0,
                                    textAlign :'center',
                                }}
                                onChangeText = {input => {
                                    
                                }}
                                onFocus = {()=>{
                                    this.setState(oldState => {return({
                                        ...oldState,isFocusInput:true
                                    })})
                                }}
                                onEndEditing = {()=>{
                                    this.setState(oldState => {return({
                                        ...oldState,isFocusInput:false
                                    })})
                                }}
                                // value = {this.state.value[i]}
                                // keyboardType = {inp.type ? inp.type : 'default'}
                                placeholder = 'Nhập mã giới thiệu'
                                clearTextOnFocus = {true}
                                enablesReturnKeyAutomatically = {true}
                                // selectTextOnFocus = {true}
                            /> 

                            <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-around'}}>
                                <Button 
                                    text = 'ĐÓNG LẠI'
                                    height = {44}
                                    width = {150}
                                    backgroundColor = {color.shadow}
                                    textColor = {color.textGray}
                                    onPress = {()=>{
                                       this.props.onClose && this.props.onClose()
                                    }}
                                /> 
                                <Button
                                    text = 'NHẬN THƯỞNG'
                                    height = {44}
                                    width = {150}
                                />
                            </View>
                        </View>
                    </Box>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        )
    };
};
      
const style = StyleSheet.create({
    
})