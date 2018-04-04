import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GirdGroup from '../components/girdGroup';

export default class buttonGroupFuntion extends Component {

    static propTypes = {
        iconLabel : PropTypes.array.isRequired,
        iconColor : PropTypes.array.isRequired,
        badge : PropTypes.object,
        badgeColor : PropTypes.object,
        onPress : PropTypes.array,
    };    

//------------------------------------------------------------------------------------------
    
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window');
        this._oWidth = width
        this._columns = 4
        this.state = {
            
        }
    }

//------------------------------------------------------------------------------------------
    
    _renderIcon = (family, name, color) => {
        switch (family) {
            case 'Entypo':
                return  <Entypo 
                            name = {name} 
                            size = {46} 
                            color= {color} > 
                        </Entypo>
              break;
            case 'MaterialCommunityIcons':
                return  <MaterialCommunityIcons 
                            name = {name} 
                            size = {46} 
                            color= {color} > 
                        </MaterialCommunityIcons>
              break;
            case 'FontAwesome':
                return  <FontAwesome 
                            name = {name} 
                            size = {46} 
                            color= {color} > 
                        </FontAwesome>
              break;
            return null
        }
    }

//------------------------------------------------------------------------------------------

    _renderButtonFuntion = (i,icon,label) => {
        let w = (this._oWidth - 60) / this._columns
        let h = w + 15
        return (
            <TouchableOpacity onPress = {()=>{
                this.props.onPress[i] && this.props.onPress[i]()
            }} >
                <View style ={{width:w, height:h, alignItems: 'stretch'}}>
                    <View style ={{flex:1.5, justifyContent:'center',alignItems: 'center',}}>
                        {icon}
                    </View>
                    <View style ={{flex:1, justifyContent:'flex-start', paddingHorizontal:2}}>
                        <Text style = {{textAlign:'center', color:color.textDark}}>
                            {label}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

//------------------------------------------------------------------------------------------

    render() {

        const {iconLabel, iconColor, badge, badgeColor,onPress} = this.props;

        return (
            <GirdGroup columns = {this._columns} elementMargin = {2.5}>
                {
                    iconLabel.map((oj,i) => this._renderButtonFuntion(i,
                        this._renderIcon(oj.family,oj.icon,iconColor[i]),oj.label,))
                }   
            </GirdGroup>
        )
    };
};

const style = StyleSheet.create(
    {
    }
  )