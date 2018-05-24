import React, { Component } from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { color } from '../utils/theme';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoxGamePurchase from '../components/boxGamePurchase';
import Button from '../components/button';

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
    const { params } = this.props.navigation.state;
    const gameTitle = params ? params.gameTitle : null;
    return (
        <View style ={style.root}>
            
            <View>
                <BoxGamePurchase
                    header = {`THÔNG TIN NẠP ${gameTitle}`}
                    onChangeInput = {res => {
                        // console.log (res)
                }}/>
                
                <Text style = {{fontSize:17, fontStyle:'italic', marginLeft:5, marginTop: 15,color:color.textGray}}>
                    Số dư: <Text style = {{fontWeight:'bold', color : color.primary}}> {this.props.balance} </Text>vnđ
                </Text>
            </View>

            <Button text = 'TIẾP THEO' fontSize = {17} height = {50} /> 
        </View>
    )
  };
};

const mapStateToProps = (state) => {
    return {
        balance : state.balance
    }
}

// const mapDispatchToProps = {
  
// };

export default connect(mapStateToProps)(scrPaymentGame)
// export default scrPaymentGame

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