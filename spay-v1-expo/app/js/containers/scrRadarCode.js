import React, { Component } from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import { color} from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrRadarCode extends Component {
    static navigationOptions = {
        title : 'DÒ TÌM GIFT CODE',
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white
    };

//   static propTypes = {
//     prop: PropTypes
//   };

  render() {
    return (
        <View style ={{
            flex : 1,
            justifyContent : 'center',
            alignItems : 'center',
            
            backgroundColor : color.background
        }}>
          {/* <TouchableOpacity style = {{
              backgroundColor :'#42689A',
              borderRadius : 10,
              padding : 20
          }}
              onPress = {()=>{
                  this.props.navigation.navigate('Tab')
              }}
          > */}
              <Text>
                  Tìm kiếm các mã khuyễn mãi, mã giftcode, trên bản đồ gần nơi của bạn và...bắt nó!
              </Text>
          {/* </TouchableOpacity> */}
        </View>
    )
  };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrRadarCode
