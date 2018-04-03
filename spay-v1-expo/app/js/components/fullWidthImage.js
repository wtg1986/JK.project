import {StyleSheet, Image, View} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class fullWidthImage extends Component {
    constructor() {
        super();

        this.state = {
            width: 0,
            height: 0
        };
    }

    _onLayout(event) {
        const containerWidth = event.nativeEvent.layout.width;
        // console.log(containerWidth)
        if (this.props.ratio) {
            this.setState({
                width: containerWidth,
                height: containerWidth * this.props.ratio
            });
        } else {
            var resolveAssetSource = require('resolveAssetSource');
            var imgSrc = resolveAssetSource(this.props.source);
            // console.log(imgSrc.height , imgSrc.width)
            this.setState({
                width: containerWidth,
                height: containerWidth * imgSrc.height / imgSrc.width
            });
        }
    }

    render() {
        return (
            <View 
                style = {this.props.style}
                onLayout = {this._onLayout.bind(this)}>
                <Image
                    source = {this.props.source}
                    style = {{
                        width: this.state.width,
                        height: this.state.height
                    }} 
                />
            </View>
        );
    }
};
      
// const style = StyleSheet.create({
    
// })

