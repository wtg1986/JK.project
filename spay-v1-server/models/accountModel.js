var mongoose = require('mongoose')
var schema = mongoose.Schema;

var accountSchema = new schema({
    accountId :{
        type: String,
        require: true
    },
    password: {
        type: String,
        required : true
    },
    accountType:{
        type: String,
        default: "normal"
    },
    mobileNumber:{
        type: String,
        require: true
    },
    email:{
        type: String,
        default:""
    },
    passport:{
        type: String,
        default:""
    },
    username:{
        type: String,
        default:""
    },
    address:{
        type: String,
        default:""
    },
    avataUrl:{
        type: String,
        default:""
    },
    pincode:{
        type: String,
        default:""
    },
    balance:{
        type: Number,
        default:0
    },
    cashBackPoint:{
        type: Number,
        default:0
    },
    refCode:{
        type: String,
        default:""
    },
    newGiftCount:{

    },
    newNotiCount:{
        type: Number,
        default:0
    },
    // lastPaymentGame:{
        
    // },
    accountState:{
        type: [{
            type: String,
            enum: [
                'ACTIVE',
                'BLOCK1',
                'BLOCK3',
                'BLOCK7',
                'BLOCK30',
                'BLOCK_FOREVER',
                'FORCE_UPDATE',
                'UPDATE',
                'MAINTENANT'
            ]
        }],
        default:['ACTIVE']
    },
    createTime:{
        type: Date,
        default: Date.now
    }
})

accountSchema.path('username').set(inputString =>{
    return inputString[0].toUpperCase() + inputString.slice(1);
})

module.exports = mongoose.model('accounts',accountSchema)