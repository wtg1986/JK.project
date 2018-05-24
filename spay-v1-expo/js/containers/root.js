import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { connect } from 'react-redux';
import LoadingIndicators from '../components/loadingIndicators';
import ToastMessage from '../components/toastMessage';

export class root extends Component {
    
    constructor(props) {
        super(props);
    }
//------------------------------------------------------------------------------------------
    componentDidMount = ()=> {
    }

//------------------------------------------------------------------------------------------
    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.children}
                <LoadingIndicators isLoading = {this.props.isLoading}/>
                <ToastMessage 
                    // ref = {componet => this.toast = componet}
                    toastIsShow = {this.props.toastIsShow}
                    toastTop = {this.props.toastTop}
                    toastMessage = {this.props.toastMessage}
                    toastIcon = {this.props.toastIcon}
                    toastIconColor = {this.props.toastIconColor}
                />
            </View>
        )
    };
};

//------------------------------------------------------------------------------------------
// toastIsShow : false,
// toastTop : new Animated.Value(-52),
// toastMessage : 'Test hiển thị toast',
// toastIcon : 'info-with-circle',

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        toastIsShow : state.toastIsShow,
        toastTop : state.toastTop,
        toastMessage : state.toastMessage,
        toastIcon : state.toastIcon,
        toastIconColor : state.toastIconColor,
    }
}

// export const anim = (value) => {
// 	return dispatch => {
//         dispatch(showToastMessage(value));
//         return  Animated.timing(this.state.toastTop, {
//                     easing: Easing.easeOutElastic,
//                     duration: 200,
//                     toValue: 22
//                 })
// 	};
// };

//------------------------------------------------------------------------------------------

export default connect(mapStateToProps)(root)



// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// };
