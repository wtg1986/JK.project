import React, { Component } from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { color} from '../utils/theme';
import {BarCodeScanner, Permissions }  from 'expo';
import {imgRuby} from '../../assets';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrQRCodeScan extends Component {
    static navigationOptions = {
        title : 'QUÉT MÃ QR-CODE',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white,
        headerBackTitle : null,
    };
    constructor(props) {
        super(props);
        this.state = {
          hasCameraPermission: null,
          // lastScannedUrl: null,
        };
    }

    async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({hasCameraPermission: status === 'granted'});
    }

    _handleBarCodeRead = ({ type, data }) => {
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
  
    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {

          return <Text>Requesting for camera permission</Text>;

        } else if (hasCameraPermission === false) {

          return <Text>No access to camera</Text>;

        } else {
          
        return (
          <View style={{ flex: 1}}>
            <BarCodeScanner
              onBarCodeRead = {this._handleBarCodeRead}
              style = {[{justifyContent:'flex-end'},StyleSheet.absoluteFill]}>
              <TouchableOpacity onPress = {()=>{
                this.props.navigation.navigate('ScrQRCodeScanHelp')
              }}>
                <Text style = {{marginBottom:20, textAlign:'center',fontSize: 20,fontWeight: 'bold',color: color.white,}}>
                  <Text style = {{fontSize:36}}>💬</Text> QUÉT MÃ QR-CODE ĐỂ LÀM GÌ ?
                </Text>
              </TouchableOpacity>
            </BarCodeScanner>
          </View>
        );
      }
    }
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)

export default scrQRCodeScan

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    //   height : 300,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
  });
  