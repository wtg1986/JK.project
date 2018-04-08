import React, { Component } from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { color } from '../utils/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
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
            <BoxGamePurchase
                header = {`THÔNG TIN NẠP ${gameTitle}`}
                onChangeInput = {res => {
                    // console.log (res)
                }}/>
            <Button text = 'TIẾP THEO' fontSize = {17} height = {50} /> 
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