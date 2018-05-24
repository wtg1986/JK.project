import React, { Component } from 'react';
import {View,TouchableOpacity,Text,StyleSheet,Platform} from 'react-native';
import { color} from '../utils/theme';
// import { MapView,Constants, Location, Permissions } from 'expo';
import { Constants, Components } from 'expo';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrRadarCode extends Component {
    static navigationOptions = {
        title : 'DÒ TÌM GIFT CODE',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white
    };
    state = {
        location: null,
        errorMessage: null,
      };
//   static propTypes = {
//     prop: PropTypes
//   };
    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
        } else {
        this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
        this.setState({
            errorMessage: 'Permission to access location was denied',
        });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
       
    };

    render() {
        let la,lo
        let text = 'Waiting..';
        if (this.state.errorMessage) {
        text = this.state.errorMessage;
        } else if (this.state.location) {
        text = JSON.stringify(this.state.location);
        
            la = this.state.location.coords.latitude
            lo = this.state.location.coords.longitude
            console.log(la,lo)
        }

        return (
        // <View style={styles.container}>
        //     <Text style={styles.paragraph}>{text}</Text>
        // </View>
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
            latitude: 20.99515,
            longitude: 105.86180,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
        />
        );
    }
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrRadarCode

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
    },
  });