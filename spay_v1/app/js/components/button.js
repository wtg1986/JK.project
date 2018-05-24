import {
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../utils/theme';

export default class button extends Component {

    static propTypes = {
        fontSize : PropTypes.number, 
        text : PropTypes.string,
        height : PropTypes.number,
        width : PropTypes.number,
        marginHorizontal: PropTypes.number,
        marginVertical: PropTypes.number,
        backgroundColor : PropTypes.string,
        textColor : PropTypes.string,
        icon : PropTypes.object,
        shadow : PropTypes.bool,
        onPress : PropTypes.func,
        top : PropTypes.number,
        left : PropTypes.number,
    }; 
    
//------------------------------------------------------------------------------------------

    static defaultProps = {
        fontSize : 15,
        text : 'TOUCH',
        height : 32,
        backgroundColor : color.primary,
        textColor : color.white,
        shadow : true
    }   

//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
    }

//------------------------------------------------------------------------------------------

    render() {
        let {icon,text,height,width,marginHorizontal,marginVertical,backgroundColor,textColor,fontSize,top,left} = this.props;
        return (
            <TouchableOpacity onPress ={ () => {this.props.onPress&&this.props.onPress()} }>
                <View style = {[style.root,{
                    height: height,
                    width: width,
                    backgroundColor: backgroundColor,
                    position : (top||left) ? 'absolute' : 'relative',
                    top : top, 
                    left: left,
                    marginHorizontal: marginHorizontal,
                    marginVertical: marginVertical,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }]}>
                    {icon}
                    <Text style = {{
                        color: textColor,
                        fontSize: fontSize,
                        marginLeft: icon ? 8 : 0,
                    }}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };
};

//------------------------------------------------------------------------------------------

const style = StyleSheet.create(
    {
        root : {
            paddingHorizontal: 10,
            justifyContent :'center',
            alignItems: 'center',
            borderRadius: 10,
            shadowColor: '#929292',
            shadowOffset: { width: 1, height: 1 },
            shadowRadius: 3,
            shadowOpacity: .5,
        },
    }
)