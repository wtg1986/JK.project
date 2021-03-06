import React, { Component } from 'react';
import {Text, 
        View, 
        StyleSheet,} from 'react-native';
import { color } from '../utils/theme';
import Button from '../components/button';
import BoxSelectAgency from '../components/boxSelectAgency';
import ModalConfirm from '../components/modalConfirm';

// import SvgUri from 'react-native-svg-uri'
// import WImage from '../components/fullWidthImage';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrCashOutWalletAgency extends Component {
    static navigationOptions = {
        title : 'RÚT TIỀN TỪ ĐẠI LÝ',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };

    constructor(props) {
        super(props);
        this.state = { 
          
        };
    }

    render() {
        return (
            <View style = {style.root}> 
                <BoxSelectAgency header = 'CHỌN ĐẠI LÝ'/>
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
export default scrCashOutWalletAgency

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
