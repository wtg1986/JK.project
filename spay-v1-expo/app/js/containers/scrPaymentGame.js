import React, { Component } from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { color } from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import BoxGamePurchase from '../components/boxGamePurchase';
import BoxSelect from '../components/boxSelect';
import Button from '../components/button';
import * as Assets from '../../assets';

export class scrPaymentGame extends Component {
    static navigationOptions = {
        title : 'NẠP TIỀN VÀO GAME',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };

//   static propTypes = {
//     prop: PropTypes
//   };

    render() {

        let input = [
            {key: 'BidaDo',
            image: {uri:Assets.iconBidaDo},
            imageSize: {h:50,w:50},
            title: 'Bida Đỏ',
            description: 'Chọc là đỏ !'},

            {key: 'AuMobile',
            image: {uri:Assets.iconAuMobile},
            imageSize: {h:50,w:50},
            title: 'Au Mobile',
            description: 'Thời trang sang chảnh'},

            {key: 'TapKich',
            image: {uri:Assets.iconTapKich},
            imageSize: {h:50,w:50},
            title: 'Tập Kích',
            description: 'Nơi khảng định bản lĩnh'},

            {key: 'ThuThanhSongKiem',
            image: {uri:Assets.iconTuThanh},
            imageSize: {h:50,w:50},
            title: 'Tử Thanh Song Kiếm',
            description: 'PK sướng tay...'},
        ]

        let gameSelected = {} 
        
        return (

            <View style ={style.root}>
                <BoxSelect
                    header = 'LỰA CHỌN GAME'
                    input = {input}
                    multiSelect = {false}
                    onSelect = {(index) => {
                        gameSelected =  input[index].title.toUpperCase()
                        // console.log(index)
                    }}
                />
                <Button text = 'TIẾP THEO' fontSize = {17} height = {50} 
                    onPress = {()=>{
                        this.props.navigation.navigate('ScrPaymentGamePurchase',{
                            gameTitle : gameSelected
                        })
                    }}
                /> 
            </View>
        )
  };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrPaymentGame

const style = StyleSheet.create(
    {
        root : {
            flex : 1, 
            justifyContent : 'space-between',
            paddingHorizontal : 10,
            paddingBottom: 15,
            backgroundColor : color.background,
        },
    })