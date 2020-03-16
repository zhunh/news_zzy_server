const db = require('../db/conn')

const NewsSchema = db.Schema({
    title:{
        type:String,
        require: true
    },
    author:{
        type:String,
        require:true
    },
    post_date:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:false
    },
    tags:{
        type:String,
        require:true
    }
})

module.exports = db.model("News", NewsSchema,"news")