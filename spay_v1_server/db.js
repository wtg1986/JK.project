//1. require thư viện mongoose
const mongoose = require('mongoose')

//2. connect DB
mongoose.connect('mongodb://localhost/spay_db')

//3. tạo schema
const accountSchema = new mongoose.Schema({
    accountId : Number,
    username : String
})

//4. tạo model
const acc = mongoose.model('account',accountSchema)

//5. CRUD
// acc.create(
//     {
//         accountId : 1,
//         username:'Khanh'
//     }
// )
