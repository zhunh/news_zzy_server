//暴露一个连接了mongoose的mongoose对象
const mongoose = require('mongoose');
//定义数据库连接地址
const url = 'mongodb://127.0.0.1:27017/news_zzy'
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: '',
    pass: ''
}
mongoose
    .connect(url, connectOptions)
    .then(() => {
        console.log("数据库连接成功")
    })
    .catch(err => {
        console.log("数据库连接失败", err.message)
    })

module.exports = mongoose