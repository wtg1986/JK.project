
import {Animated} from 'react-native';

const myState= {
//AppState----------------------
    isLoading : false,
    toastIsShow : false,
    toastTop : new Animated.Value(-52),
    toastMessage : 'Test hiển thị toast',
    toastIcon : 'info-with-circle',
    toastIconColor : 'tomato',

//Message Info----------------------
    messageData : {},

//Account Info----------------------
    accessToken : null,
    accountId : "0973651368",
    mobileNumber : "0973651368",
    // createTime : ISODate("2018-04-09T08:34:30.559Z"),
    accountState : "ACTIVE",
    pushToken : "ExponentPushToken[cjV4xeKe36uX4XcDl5z6Ly]",
    newNotiCount : 0,
    latitude : 20.995174,
    longitude : 105.86248,
    accountStatus : "ONLINE",
    refCode : "",
    cashBackPoint : 500,
    balance : 400000,
    avataUrl : "/images/avatas/avata_0973651368.jpg",
    address : "106/41 Phố Vọng, Hai Bà Trưng, Hà Nội",
    username : "Kenny Tran",
    passport : "012322571",
    email : "khanhtd.it@gmail.com",
    accountType : "normal",
    // socketId : null,
}

const reduer = (state = myState, action) => {

    switch (action.type) {
        
        case 'UPDATE_LOADING_STATE':
            return {...state,
                isLoading : action.value,
            };

        case 'SHOW_TOAST':
            return {...state,
                toastIsShow : true,
                toastMessage : action.value.toastMessage,
                toastIcon : action.value.toastIcon,
                toastIconColor : action.value.toastIconColor,
            };
        
        case 'HIDE_TOAST':
            return {...state,
                toastIsShow : false,
            };
        
        case 'UPDATE_ACCESS_TOKEN':
            return {...state,
                accessToken : action.value,
            };

        case 'UPDATE_ACC':
            return {...state,
                accountId : action.value.accountId,
                mobileNumber:action.value.mobileNumber,
                createTime: action.value.createTime,
                accountState: action.value.accountState,
                pushToken : action.value.pushToken,
                newNotiCount : action.value.newNotiCount,
                latitude : action.value.latitude,
                longitude : action.value.longitude,
                accountStatus : action.value.accountStatus,
                refCode : action.value.refCode,
                cashBackPoint : action.value.cashBackPoint,
                balance : action.value.balance,
                avataUrl : action.value.avataUrl,
                address : action.value.address,
                username : action.value.username,
                passport : action.value.passport,
                email : action.value.email,
                accountType: action.value.accountType,
            };
        
        case 'UPDATE_BALANCE':
            return {...state,
                balance : action.value,
            };
        
        case 'NEW_MESSAGE':
            return {...state,
                messageData : action.value
            };

        // case 'UPDATE_LOCATION':
        //     return {...state,
        //         balance : state.balance - action.amount,
        //     };
        
        // case 'CASH_IN':
        //     return {...state,
        //         balance : state.balance + action.amount,
        //     };

    }
    
    return state;
}

export default reduer;