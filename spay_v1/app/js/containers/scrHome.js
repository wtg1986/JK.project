import React, { Component } from 'react';
import { View,TouchableOpacity,Text,StyleSheet,Modal } from 'react-native';
import { color } from '../ultis/theme';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class scrHome extends Component {
//   static propTypes = {
//     prop: PropTypes
//   };
    static navigationOptions = {
        header :null
    };
  render() {
    return (
        <View style = {style.root}>
            <View style = {style.top}> 
            </View>

            <View style = {style.body}>

                <View style = {{
                    backgroundColor : color.box,
                    height : 320,
                    marginTop : 56,
                    marginHorizontal: 15,
                    borderRadius : 10,
                    shadowColor: '#929292',
                    shadowOffset: { width: 1, height: 1 },
                    shadowRadius: 2.5,
                    shadowOpacity: .3,
                }}>

            </View>

            </View>

            <View style={{
                flex : 1,
                flexDirection : 'row',
                height: 84,
                top: 118,
                left: 0, 
                right: 0,
                position: 'absolute',
                // backgroundColor: color.box,
                justifyContent : 'space-around'
            }}>
                <View style = {{
                    backgroundColor : color.box,
                    height : 80,
                    width : 64,
                    borderRadius : 10,
                    shadowColor: '#929292',
                    shadowOffset: { width: 1, height: 1 },
                    shadowRadius: 2.5,
                    shadowOpacity: .3,
                }}>
                </View>

                <View style = {{
                    backgroundColor : color.box,
                    height : 80,
                    width : 64,
                    borderRadius : 10,
                    shadowColor: '#929292',
                    shadowOffset: { width: 1, height: 1 },
                    shadowRadius: 2.5,
                    shadowOpacity: .3,
                }}>
                </View>

                <View style = {{
                    backgroundColor : color.box,
                    height : 80,
                    width : 64,
                    borderRadius : 10,
                    shadowColor: '#929292',
                    shadowOffset: { width: 1, height: 1 },
                    shadowRadius: 2.5,
                    shadowOpacity: .3,
                }}>
                </View>

                <View style = {{
                    backgroundColor : color.box,
                    height : 80,
                    width : 64,
                    borderRadius : 10,
                    shadowColor: '#929292',
                    shadowOffset: { width: 1, height: 1 },
                    shadowRadius: 2.5,
                    shadowOpacity: .3,
                }}>
                </View>
            </View>
        </View>
    )
  };
};

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };

// export default connect(mapStateToProps, mapDispatchToProps)(componentName)
export default scrHome


const style = StyleSheet.create(
    {
      root : {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
      },
      body : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor : color.background
      },
      top : {
        height : 160,
        backgroundColor : color.primary
      },
    }
  )