
import {
    StyleSheet, 
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {color} from '../ultis/theme';
import ElementSelect from '../components/elementSelect';

export default class boxSelect extends Component {
    static propTypes = {
        header : PropTypes.string,
        input : PropTypes.array, // [{key,image,imageSize,title,description},...]  
        onSelect : PropTypes.func,
        multiSelect : PropTypes.bool
    };    
    static defaultProps = {
        header : 'LỰA CHỌN',
        multiSelect : false
    }; 
    constructor(props) {
        super(props);
        this.state = { 
            isSelect : Array(this.props.input.length).fill(false),
            selected : []
        };
    }

    render() {
        return (
        <View style = {style.root}>
            <Text style = {style.header}> {this.props.header} </Text>
            {this.props.input.map((inp,i) => 
                <TouchableWithoutFeedback key = {i}
                    onPress = {e => {

                        let newValue
                        if (this.props.multiSelect)
                        {
                            [ ...newValue ] = this.state.isSelect;
                            newValue[i] = !newValue[i]
                        } else
                        {
                            newValue = Array(this.props.input.length).fill(false)
                            newValue[i] = true
                        }

                        this.setState ({
                            ...this.state, isSelect:newValue
                        },()=>{
                            if (!this.props.multiSelect)
                                this.state.selected[0] = inp.key
                            else 
                            {
                                if (this.state.isSelect[i])
                                    this.state.selected.push(inp.key)
                                else {
                                    let index = this.state.selected.indexOf(inp.key)
                                    this.state.selected.splice(index, 1)
                                }
                            }
                            Keyboard.dismiss()
                            this.props.onSelect&&
                            this.props.onSelect(inp.key,this.state.selected)
                        })
                    }}
                >
                    <View>
                        <ElementSelect
                            image = {inp.image}
                            imageSize = {inp.imageSize}
                            title = {inp.title}
                            description = {inp.description}
                            tintColor = {color.primary}
                            isSelect = {this.state.isSelect[i]}
                        /> 
                    </View>
                </TouchableWithoutFeedback>
            )}
            
        </View>
        )
    };
};

const style = StyleSheet.create(
  {
    root : {
        marginTop: 15,
        // marginHorizontal: 15,
        paddingVertical: 20,
        justifyContent :'flex-start',
        backgroundColor : color.box,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .4,
    },
    header : {
        alignSelf:'center',
        marginBottom:20,
        fontSize:16,
        color: color.textDark
    },
  }
)