import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import PropTypes from 'prop-types';
// import PopLogin from './popLogin'
import AppColor from '../../utils/color'
import * as Action from '../../actions'
export class DiscoveryScr extends Component {
    constructor(props) {
        super(props);
        this.state = { txtMobile: 'Nhập vào số điện thoại' };
        }
  render() {
    return (
      <View style = {style.root}>
            <View style = {style.body}>
                <Text style = {{justifyContent:'center',alignItems:'center'}}>
                    Discovery screen
                </Text>
                <TouchableOpacity style ={{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor : 'tomato',
                    padding : 10,
                    borderRadius : 10
                }}
                onPress = {()=>{
                    // this.props.dispatch({type:'CHANGE',value:'0968.434.969'})
                    this.props.changeMobile()
                    this.props.navigation.navigate('Home')
                }}
                >
                    <Text>
                        CẬP NHẬT SỐ ĐIỆN THOẠI
                    </Text>
                </TouchableOpacity>
                {/* <PopLogin
                    imgLogo = {require('../../../App/images/logoSpay.png')} 
                    txtNotification = 'Nhập số điện thoại để tiếp tục'
                    // txtDescription = 'Thiết lập mật khẩu bảo vệ:'
                    // txtInputDefault = 'Nhập mật khẩu'
                    txtButon = 'TIẾP TỤC'
                    // txtHyperlink1 = 'Thay đổi số điện thoại'
                    enumInputType = 'TEXT'
                    // txtHyperlink2 = ''
                    onAction = {()=>{
                        this.props.navigation.navigate('Loading')
                    }}
                >
                </PopLogin> */}
            </View>

          <View style = {style.bottom}>
            <Image 
                style={style.imgLogoVTC} 
                source={require('../../../assets/logos/logoVTC.png')}
              />
          </View>
      </View>
    )
  }
};


// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)



export default connect(null,Action)(DiscoveryScr);

const style = StyleSheet.create(
  {
    root : {
      flex: 1,
    },
    body : {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : AppColor.background
    },
    bottom : {
      height : 80,
      backgroundColor : AppColor.background
    },
    imgLogoVTC :{
      alignSelf: 'center', 
      height: 30,
      resizeMode: 'contain'
    },
  }
)
