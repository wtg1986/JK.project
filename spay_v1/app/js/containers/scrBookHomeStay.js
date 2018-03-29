import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { color } from '../ultis/theme';
import BoxSelect from '../components/boxSelect';
import BoxInput from '../components/boxInput';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrBookHomeStay extends Component {
    static navigationOptions = {
        title :'ĐẶT HOME STAY',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white
    };
//   static propTypes = {
//     prop: PropTypes
//   };
    render() {
        return (
            <View style ={{
                flex : 1,
                justifyContent : 'center',
                // alignItems : 'center',
                backgroundColor : color.background
            }}>
            <BoxSelect
                header = 'CHỌN THE CAO'
                input = {[
                    {key: 'TheViettel',
                    image: require ('../../assets/icons/imgBidaDo.png'),
                    imageSize: {h:44,w:44},
                    title: 'The Viettel',
                    description: 'Chiet khau 5%'},

                    {key: 'TheVinaPhone',
                    image: require ('../../assets/icons/imgTapKich.png'),
                    imageSize: {h:44,w:44},
                    title: 'The Vina',
                    description: 'Chiet khau 3%'},

                    {key: 'TheMobile',
                    image: require ('../../assets/icons/imgAuMobile.png'),
                    imageSize: {h:44,w:44},
                    title: 'The Mobile',
                    description: 'Chiet khau 5%'},

                ]}
                multiSelect = {true}
                onSelect = {(key,arr) => {
                //    alert(key)
                }}>

            </BoxSelect>

            <BoxInput
                header = 'SỐ TIỀN MUỐN NẠP'
                input = {[
                    {key : 'Money',
                    type : 'numbers-and-punctuation',
                    default : 'Nhập số tiền',
                    color : color.primary,
                    unit : 'VNĐ',
                    suggest : [{'key':'10,000'},{'key':'20,000'},{'key':'50,000'},{'key':'100,000'},
                    {'key':'200,000'},{'key':'500,000'},{'key':'1,000,000'},{'key':'5,000,000'},]},
                    
                    {key : 'Mobile',
                    type : 'numbers-and-punctuation',
                    default : 'Nhập số dien thoai',
                    color : color.primary,}
                ]}
                onEndEditing = {(e)=>{
                    alert (e)
                }}
            /> 

                {/* <Text>
                    Dịch vụ đặt phòng home stay cho cặp đôi
                </Text>  */}
            </View>
        )
    };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrBookHomeStay
