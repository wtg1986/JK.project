import React, { Component } from 'react';
import { 
    Text,
    View,
    Image,
    StyleSheet,
 } from 'react-native';
import { color } from '../../utils/theme';
import { logoSpay,logoVTC} from '../../../assets';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Button from '../../components/button';
import * as api from '../../utils/api';

export default class scrAuthResult extends Component {

//------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);
    }

//------------------------------------------------------------------------------------------

render() {
        return (
        <View style = {style.root}>
      
          <View style = {style.body}>

              <View style = {style.popup}>

                  <Image style = {style.imgLogoSpay} source={logoSpay}/>
                  
                  <View style = {{marginTop:10,marginBottom:5,alignItems: 'center',}}>
                      <EntypoIcon name = {'thumbs-up'} size= {64} color={color.secondary}/> 
                  </View>

                  <Text style = {style.textComment}>
                      Tài khoản ví  <Text style ={{fontWeight:'bold',color:color.primary}}>
                        {this.props.navigation.state.params.mobileNumber}
                        {/* 0973651368 */}
                      </Text>  đã đăng ký thành công.
                  </Text>

                  <View>
                      <Button
                          text = 'SỬ DỤNG VÍ'
                          fontSize = {17}
                          marginHorizontal = {10}
                          height = {50}
                          onPress = {() => {this.props.navigation.navigate('Main')}}
                      />
                  </View>

              </View>
          </View>
          
          <View style = {style.bottom}>
              <Image 
                  style={style.imgLogoVTC} 
                  source={logoVTC}
              />
          </View>
        </View>
        )
    }
};

//------------------------------------------------------------------------------------------

const style = StyleSheet.create(
  {
    root : {
        flex : 1,
        backgroundColor : color.background,
        padding : 10,
        justifyContent : 'center',
    },
    body : {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor : color.background
    },
    popup : {
        flex: 1,
        height : 360,
        justifyContent :'flex-start',
        // alignItems: 'center',
        backgroundColor : color.box,
        borderRadius: 10,
        shadowColor: '#929292',
        shadowOffset: { width: .6, height: .6 },
        shadowRadius: 2.5,
        shadowOpacity: .4,
    },
    imgLogoSpay :{
        alignSelf: 'center',
        marginTop: 25,
        height: 68,
        resizeMode: 'contain',
        marginBottom: 5
    },
    textComment :{
        width: 310,
        alignSelf: 'center',
        color: color.textGray,
        fontSize: 17,
        alignContent: 'center',
        textAlign : 'center',
        marginBottom: 25,
    },
    bottom : {
        height : 80,
        backgroundColor : color.background
    },
    imgLogoVTC :{
        alignSelf: 'center', 
        height: 36,
        resizeMode: 'contain'
    },
  }
)



// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// export class componentName extends Component {
//   static propTypes = {
//     prop: PropTypes
//   };

//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   };
// };

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
