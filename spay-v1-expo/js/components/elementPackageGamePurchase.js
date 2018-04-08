import {
    StyleSheet, 
    Text, 
    View, 
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../utils/theme';
import WImage from '../components/fullWidthImage';

export default class elementPackageGamePurchase extends Component {

    static propTypes = {
        // image : PropTypes.object,
        index : PropTypes.number,
        imageSize : PropTypes.object,
        moneyInGame : PropTypes.number,
        moneyInGameUnit : PropTypes.string,
        moneyCash : PropTypes.number,
        discount : PropTypes.string,
        tintColor : PropTypes.string,
        isSelect : PropTypes.bool,
        onSelect : PropTypes.func
    };    

//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
        // this.state = { 
        //     isSelect : this.props.isSelect,
        // }; 
    }

//------------------------------------------------------------------------------------------

    render() {
        const {
            isSelect,
            index,
            image,
            imageSize,
            moneyInGame,
            moneyInGameUnit,
            moneyCash,
            discount,
            tintColor,
            onSelect
        } = this.props

        return (
            <TouchableWithoutFeedback onPress = {()=>{ onSelect && onSelect(index) }}>

                <View style = {[style.root,{ borderColor: isSelect ? tintColor : color.shadow,}]}>
                    
                    <View style = {style.moneyInGameGroup}>
                    
                        <WImage style ={[style.image, {width : imageSize.w,}]} source = {image}/>
                    
                        <Text style ={[style.textMoneyInGame,{color : color.textDark,}]}>
                            {moneyInGame}{moneyInGameUnit}
                        </Text>

                        {
                            discount ?
                            <View style = {style.discountBorder}>
                                <Text style = {style.textDiscount}> {discount} </Text>
                            </View>
                            :null
                        }

                    </View>

                    <View style ={[style.moneyCashGroup,{
                        backgroundColor : isSelect ? tintColor : null,
                        borderColor : isSelect ? tintColor : color.shadow
                    }]}>
                        <Text style ={[style.textMoneyCash,{
                            color : isSelect ? color.white : color.primary
                        }]}>
                            {moneyCash}đ
                        </Text>
                    </View>  

                </View>

            </TouchableWithoutFeedback>
        )
    };
};

//------------------------------------------------------------------------------------------

const style = StyleSheet.create(
    {
        root :{
            // justifyContent: 'flex-start',
            // alignItems: 'center',
            borderRadius: 9,
            borderWidth: 1,
            borderColor: color.shadow,
        },
        moneyInGameGroup: {
            // backgroundColor : color.test,
            justifyContent : 'center',
            alignItems: 'center',
        },
        moneyCashGroup:{
            marginTop:6, 
            alignItems:'center',
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            borderTopWidth : 1,
            borderColor : color.shadow,
            padding : 3
        },
        discountBorder:{
            backgroundColor:'tomato',
            borderRadius : 7,
            padding:1,
            position:'absolute',
            right : 0,
            top : 0,
            shadowColor: '#929292',
            shadowOffset: { width: .6, height: .6 },
            shadowRadius: 2.5,
            shadowOpacity: .4,
        },
        image:{
            marginHorizontal : 5,
            marginTop: 5,
            marginBottom:2
        },
        textMoneyInGame: {
            fontWeight:'bold', 
            fontStyle:'italic',
            fontSize:15
        },
        textMoneyCash:{
            fontSize:17,
            fontWeight:'800',
            color:color.primary
        },
        textDiscount:{
            fontSize:14,
            fontWeight:'800',
            color:color.white,
        }
    }
)