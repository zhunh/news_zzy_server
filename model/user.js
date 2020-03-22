const db = require("../db/conn")

const UserSchema = db.Schema({
    username:String,
    password:String
})

module.exports = db.model("user", UserSchema, "user")