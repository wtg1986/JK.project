var mongoose = require('mongoose');

//cài đặt cấu hình database
let options = {
    useMongoClient: true,
}

//Hàm khởi tạo kết nối tới datababse
const init = (endPoint) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(endPoint,options)
    .then(
        () => {
            console.log('Connect DB Successfully.')
        },
        err => {
            console.log(`Connect failed. Error: ${err}`)
        }
    )
}
module.exports = {init};
