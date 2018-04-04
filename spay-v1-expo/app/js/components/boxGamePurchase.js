
import {StyleSheet, Text, View, Keyboard} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import GirdGroup from '../components/girdGroup';
import Entypo from 'react-native-vector-icons/Entypo';
import BoxInput from '../components/boxInput';
import * as Assets from '../../assets';
import ElementPackageGamePurchase from '../components/elementPackageGamePurchase';

export default class boxGamePurchase extends Component {
    static propTypes = {
        header : PropTypes.string,
        input : PropTypes.array,
        description : PropTypes.string,
        packageMoney : PropTypes.array, // image/moneyInGame,unitText,moneyCash,
        onChangeInput : PropTypes.func
    } 
    static defaultProps = {
        header : 'THÔNG TIN NẠP TỬ THANH SONG KIẾM',
        input : [
            {key : 'ScoinID',
            type : 'default',
            default : 'Nhập tài khoản ScoinID',
            iconName : 'account-circle',
            color : color.primary,
            suggest : [{'key':'popilala'},{'key':'jokerMrk'},{'key':'KennyJ'},]},
            
            {key : 'ServerName',
            type : 'default',
            default : 'Nhập server Game',
            iconName : 'server-network',
            color : color.primary,
            suggest : [{'key':'S1'},{'key':'S2'},{'key':'S3'},]},
        ],
        description : 'Chọn gói KNB muốn nạp:',
        packageMoney : [
            {
                image : Assets.imgKNB,
                imageSize : {w:86,h:86},
                moneyInGame : 1000,
                moneyInGameUnit : 'KNB',
                discount : '',
                moneyCash : 10000,
            },
            {
                image : Assets.imgKNB,
                imageSize : {w:86,h:86},
                moneyInGame : 5150,
                moneyInGameUnit : 'KNB',
                discount : '+3%',
                moneyCash : 50000,
            },
            {
                image : Assets.imgKNB,
                imageSize : {w:86,h:86},
                moneyInGame : 10500,
                moneyInGameUnit : 'KNB',
                discount : '+5%',
                moneyCash : 100000,
            },
            {
                image : Assets.imgKNB,
                imageSize : {w:86,h:86},
                moneyInGame : 55000,
                moneyInGameUnit : 'KNB',
                discount : '+10%',
                moneyCash : 500000,
            }
        ]
    }
    constructor(props) {
        super(props);
        this.state = { 
            selected : -1
        };
        this._data = []
    }
    
    render() {
        // let ar = Array(7).fill(0)
        const {header, input, description, packageMoney, onChangeInput} = this.props
        return (
            <BoxInput 
                header = {header}
                input = {input}
                onEndEditing = {(res)=>{
                    this._data[res.key] = res.value
                    onChangeInput && onChangeInput(this._data)
                }} 
                // onFocus = {(obj)=>{
                // }}
            >

                <Text style = {style.textDescription}>
                    {description}
                </Text>

                <GirdGroup style = {{marginHorizontal: 20}}
                    columns = {3} elementMargin = {2.5} >
                    {packageMoney.map((oj,i)=>
                        <ElementPackageGamePurchase key = {i}
                            index = {i}
                            image = {oj.image}
                            imageSize = {oj.imageSize}
                            moneyInGame = {oj.moneyInGame}
                            moneyInGameUnit = {oj.moneyInGameUnit} 
                            discount = {oj.discount}
                            moneyCash = {oj.moneyCash}

                            isSelect = {this.state.selected === i ? true : false}
                            tintColor = {color.primary}
                            onSelect = {index => {
                                Keyboard.dismiss()
                                this.setState({selected : index})
                                this._data['package'] = index
                                onChangeInput && onChangeInput(this._data)
                            }}
                        />
                    )}
                </GirdGroup>  
            </BoxInput>
        )
    };
};

const style = StyleSheet.create(
    {
        root : {
            marginTop: 15,
            marginHorizontal: 15,
            paddingVertical: 20,
            justifyContent :'flex-start',
            alignItems: 'center',
            backgroundColor : color.box,
            borderRadius: 10,
            shadowColor: '#929292',
            shadowOffset: { width: .6, height: .6 },
            shadowRadius: 2.5,
            shadowOpacity: .4,
        },
        textDescription : {
            color :color.textDark,
            marginTop : 15,
            marginBottom : 10,
            marginLeft : 20,
            fontSize: 15,
        }
    }
)