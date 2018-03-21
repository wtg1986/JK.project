import React, { Component } from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import { color} from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrSellCardCode extends Component {
    static navigationOptions = {
        title : 'THU MA MÃ THẺ',
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
                  Thu mua mã thẻ bạn có với phí 16%. Tiền sẽ được nạp vào Ví Spay
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
export default scrSellCardCode
