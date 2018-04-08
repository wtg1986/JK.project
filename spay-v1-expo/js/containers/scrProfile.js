import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { color} from '../utils/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import BoxInput from '../components/boxInput';
import SvgUri from 'react-native-svg-uri'
import {svgAvataMen} from '../../assets';
import Button from '../components/button';
export class scrProfile extends Component {
    static navigationOptions = {
        title : 'THÔNG TIN TÀI KHOẢN',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };
//   static propTypes = {
//     prop: PropTypes
//   };

    render() {
        return (
            <View style ={{flex : 1, backgroundColor : color.background, padding : 10, justifyContent:'space-between'}}>

                <View style = {style.box}>

                    <Text style = {style.textMobile}>
                        Số điện thoại: <Text style = {[style.textMobile,{fontWeight: 'bold',color:color.primary}]} >
                            0973.651.368
                        </Text>
                    </Text>

                    <BoxInput
                        hasBox = {false}
                        header = ''
                        input = {[
                            {
                                key : 'Email',
                                type : 'default',
                                default : 'Email',
                                iconName : 'contact-mail',
                                color : color.textGray,
                            },
                            {
                                key : 'Passport',
                                type : 'default',
                                default : 'Chứng minh nhân dân',
                                iconName : 'passport',
                                color : color.textGray,
                            },
                            {
                                key : 'Username',
                                type : 'default',
                                default : 'Tên đầy đủ',
                                iconName : 'account-settings',
                                color : color.textGray,
                            },
                            {
                                key : 'Address',
                                type : 'default',
                                default : 'Địa chỉ',
                                iconName : 'home-map-marker',
                                color : color.textGray,
                            },
                        ]}
                    />

                    <View style ={{flexDirection:'row', 
                            justifyContent:'space-between', 
                            alignItems:'center',
                            marginTop:15,
                            marginHorizontal:20}}>
                        <View>
                            <Text style = {[style.textMobile,{marginLeft:0}]}>PIN code ⚠️</Text>
                            <Text style = {[style.textMobile,{fontSize:14,fontStyle:'italic',marginLeft:0, marginTop:3,width:230}]}>
                                Bạn cần cài đặt PIN code trước khi giao dịch
                            </Text>
                        </View>
                        <Button text = 'CÀI ĐẶT' 
                            backgroundColor = 'tomato'
                            height = {44}
                        />
                        
                    </View>

                </View>

                <View style ={{
                    position: 'absolute',
                    padding:5,
                    top : 20,
                    alignSelf: 'center',
                    backgroundColor: color.box,
                    borderRadius: 70,
                    borderWidth: 1,
                    borderColor: color.shadow,
                }}>
                    <SvgUri 
                        width="130" 
                        height="130" 
                        source = {{uri:svgAvataMen}}>
                    </SvgUri>

                </View>
           
                <Button text = 'CẬP NHẬT' fontSize = {17} height = {50} />
            
            </View>
        )
    };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrProfile

const style = StyleSheet.create(
{
    box : {
        marginTop: 65 + 25,
        paddingTop: 65 + 25,
        paddingVertical: 20,
        justifyContent :'flex-start',
        backgroundColor : color.box,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .4,
    },
    textMobile : {
        marginLeft: 20,
        marginBottom: 3,
        fontSize: 18,
        // fontWeight: 'bold',
        color: color.textGray
    }
    
})