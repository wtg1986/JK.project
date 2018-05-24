const myState= {
    accountId : "0973651368",
    mobileNumber : "0973651368",
    // password : "zxcvbn",
    // "createTime" : ISODate("2018-04-09T08:34:30.559Z"),
    // "accountState" : [ 
    //     "ACTIVE"
    // ],
    pushToken : "ExponentPushToken[cjV4xeKe36uX4XcDl5z6Ly]",
    newNotiCount : 0,
    latitude : 20.995174,
    longitude : 105.86248,
    // "accountStatus" : "offline",
    refCode : "",
    cashBackPoint : 500,
    balance : 400000,
    // "pincode" : "",
    avataUrl : "/images/avatas/avata_0973651368.jpg",
    address : "106/41 Phố Vọng, Hai Bà Trưng, Hà Nội",
    username : "Kenny Tran",
    passport : "012322571",
    email : "khanhtd.it@gmail.com",
    accountType : "normal",

    socketId : null,
    
}

const reduer = (state = myState, action) => {

    if (action.type === 'UPDATE_ACC')
    {
        let newState = action.value
        return {...state,
            mobileNumber:action.value.mobileNumber,
            accountId : action.value.accountId,
            pushToken : action.value.pushToken,
            newNotiCount : action.value.newNotiCount,
            latitude : action.value.latitude,
            longitude : action.value.longitude,
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
    }

    if (action.type === 'UPDATE_LOCATION')
    {
        return {...state,
            latitude : action.value.latitude,
            longitude : action.value.longitude,
        };
    }
    if (action.type === 'CASH_OUT')
    {
        return {...state,
            balance : state.balance - action.amount,
        };
    }
    if (action.type === 'CASH_IN')
    {
        return {...state,
            balance : state.balance + action.amount,
        };
    }
    return state;
}

export default reduer;