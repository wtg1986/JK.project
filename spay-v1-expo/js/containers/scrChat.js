import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Keyboard,
    FlatList
} from 'react-native';
import { color } from '../utils/theme';
import { connect } from 'react-redux';
import Button from '../components/button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-navigation'
import ElementMessage from '../components/elementMessage';
import { socketio } from '../containers/stateIO';
import * as actions from '../actions';
import * as api from '../utils/api';
import _ from 'lodash';

// react-native-gesture-handler

export class scrChat extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.title}`,
        headerStyle : {backgroundColor: color.primary, borderBottomWidth: 0,},
        headerTintColor : color.white
    })
    
    constructor(props) {
        super(props);
        this.state = { 
            inputValue : '',
            messageData : [ ] // Mảng thể hiện trạng thái danh sách tin nhắn.
        };
        this.socket = socketio.getInstance() // Class Socket để nhận và gửi dữ liệu chat
        this.partner = this.props.navigation.state.params; // Dữ liệu đối tác chát với mình
    }

    _convertTime = (time) => {
        let phut = Math.floor((Date.now() - time)/60000)
        if (phut < 60) return phut +'phút'
        if (phut >= 60 && phut < 1440) return Math.floor(phut/60) +'giờ'
        if (phut >= 1440 && phut < 10080) return Math.floor(phut/1440) +'ngày'
        if (phut >= 10080) return time.toLocaleDateString('en-GB')
    }

    componentDidMount = () => {
        
        //Giải phóng sự kiện hiển thị toast khi có tin nhắn
        this.socket.removeEvent('onChatMessage')

        // Trượt flatlist đến cuối cùng khi bàn phím hiển thi
        _keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
            this.flatList.scrollToEnd()
        });

        // Hiển thị loading đợi load dữ liệu tin nhắn.
        this.props.loadingIndicators(true)

        // Gọi api lấy dữ liệu tin nhắn của 2 người
        api.chatGetMessages({
            accountId : this.partner.accountId
        },this.props.accessToken,value => {

            // Nếu chưa cho dữ liệu, tắt loading và return
            if (value.length === 0) return this.props.loadingIndicators(false)

            // Chuẩn bị dữ liệu tin nhắn để đẩy vào state
            let messLst = value.messageData.map((v,k)=>{
                return ({
                    accountId : v.from,
                    mobileNumber : v.from,
                    userName : v.from,
                    avataUrl : v.from === this.props.accountId ? null : this.partner.avataUrl,
                    isMe : v.from === this.props.accountId,
                    message : v.message,
                    time : this._convertTime(v.time)
                })
            })

            // Đẩy vào state hiển thị.
            this.setState(oldState => {return({
                ...oldState,
                messageData: messLst
            })},()=>{ 
                // Hiển thị xọng, tắt loading và trượt flatlist xuống cuối
                this.props.loadingIndicators(false) 
                // setTimeout(() => {
                //     this.flatList.scrollToEnd()
                // },80)
            })

            // Cài đặt sự kiện đón mess gửi từ server về.
            this.socket.setEvent('onChatMessage',(data) => {
                // Nếu có dữ liệu tin nhắn từ server trả về, sẽ đẩy vào state và hiển thị
                this.setState(oldState => {return({
                    ...oldState,
                    messageData: [...oldState.messageData,_.update(data,'time',this._convertTime)]
                })},() => {
                    setTimeout(()=>{
                        this.flatList.scrollToEnd()
                    },80)
                })
            })
        })

    }
    
	componentWillUnmount = () => {
        // Giải phóng các sự kiện khi thoát màn hình này
        _keyboardWillShowSubscription.remove();
        
        // Giải phóng sự kiện hiển thị trong cửa sổ chát
        this.socket.removeEvent('onChatMessage')

        // Cập nhật sự kiện mới để hiện thị toast
        this.socket.setEvent('onChatMessage',(data)=>{
            let {mobileNumber, message} = data
            this.props.showToastMessage({
                toastMessage : 
                <Text>SĐT: <Text style = {{color:color.primary}}>{mobileNumber}</Text> đã nhắn tin cho bạn.</Text>,
                toastIcon : 'chat',
                toastIconColor : color.secondary,
            },2500)
        }) 
	}

    _onSendMessage = (message) => {
        // Sự kiện khi bấm nút send message. Đẩy tin nhắn mới vào state để hiển thị
        this.setState(oldState => {return({
            ...oldState, 
            messageData: [...oldState.messageData, {
                isMe : true,
                message : message,
                time : this._convertTime(Date.now())
            }]
        })},() => {
            setTimeout(()=>{
                this.flatList.scrollToEnd()
            },80)
        })

        // Gửi tin nhắn về server
        this.socket.emit('onChatMessage',{
            fromAccountId : this.props.accountId, 
            toAccountId : this.partner.accountId, 
            message : message
        })
    }

    _renderInputGroup = (action) => {
        // Vẽ nhóm input và button.
        return (
            <View style = {style.groupInput}>
                <TextInput
                    ref = {me => this.messageInput = me}
                    style = {style.textInput}
                    multiline = {true}
                    autoCorrect = {false}
                    underlineColorAndroid = 'transparent'
                    value = {this.state.inputValue}
                    keyboardType = 'default'
                    placeholder = 'Nhập lời nhắn...'
                    onChangeText = {(input)=>{
                        this.setState(oldState => {return({...oldState, inputValue: input})})
                    }}
                />
                <View style = {{flexDirection: 'column', justifyContent: 'flex-end',}}>
                    <View style = {{flexDirection: 'row'}}>
                        <Button 
                            height = {44} width = {44}
                            icon = {<Icon name = 'dollar' size = {30} color = {color.white} />}
                            text = ''
                            onPress = {e => {
                                action && action.onSendMoney && action.onSendMoney()
                            }}
                        />
                        <View style = {{margin: 5}}/>
                        <Button 
                            height = {44} width = {44}
                            backgroundColor = {color.third}
                            icon = {<Icon name = 'send' size = {26} color = {color.white} />}
                            text = ''
                            onPress = {() => {
                                let newMessage = this.state.inputValue
                                action && action.onSendMessage && action.onSendMessage(newMessage)
                                this.setState(oldState => {return({
                                    ...oldState, inputValue: ''
                                })})
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    _renderMessageItem = ({item}) => {
        // Vẽ nhóm message
        return  item && <ElementMessage   
                    isMe = {item.isMe}
                    userName = {item.userName}
                    mobileNumber = {item.mobileNumber}
                    avataUrl = {item.avataUrl}
                    accountId = {item.accountId}
                    message = {item.message}
                    time = {item.time}/>
    }

    render() {
        return (
            <View style = {style.root}>

                <View style = {{flex:1}}> 
                    <FlatList
                        ref = {me => this.flatList = me}
                        data = {this.state.messageData}
                        renderItem = {this._renderMessageItem}
                    />
                </View> 

                <KeyboardAvoidingView 
                    behavior = 'padding' 
                    keyboardVerticalOffset = {Header.HEIGHT + 5}> 
                    {this._renderInputGroup({
                        onSendMessage : this._onSendMessage ,

                        onSendMoney : () => {
                        }
                    })}
                </KeyboardAvoidingView>
            </View>
        )
    };
};

const mapStateToProps = (state) => {
    return { 
        accountId: state.accountId,
        accessToken : state.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingIndicators: (value) => { dispatch(actions.loadingIndicators(value)) },
        showToastMessage: (value, duration) => { dispatch(actions.showToastMessage(value, duration)) },
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(scrChat)
// export default scrChat

const style = StyleSheet.create(
    {
        root : {
            flex : 1,
            backgroundColor : color.background,
            paddingTop: 0,
            padding : 10,
            justifyContent : 'space-between',
        },
        groupInput : {
            flexDirection: 'row',
            marginTop: 5,
        },
        textInput : {
            flex:1,
            fontSize: 18,
            color:color.textDark,
            paddingHorizontal: 11,
            paddingTop: 11,
            paddingBottom: 11,
            backgroundColor: color.white,
            marginRight: 10,
            borderRadius: 10,
        }
    }
)