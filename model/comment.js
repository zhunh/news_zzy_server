const db = require('../db/conn')

const CommentSchema = db.Schema({
    user:{
        type:String,
        require:true
    },
    post_date:{
        type:String,
        require:true
    },
    news_id:{
        type:String,
        require:true
    },
    comment:{
        type:String,
        require:true
    }
})

module.exports = db.model("Comment", CommentSchema,"comment")