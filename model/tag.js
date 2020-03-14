const db = require("../db/con")

const TagSchema = db.Schema({
    name:String
})

module.exports = db.model("tag", TagSchema, "tag")