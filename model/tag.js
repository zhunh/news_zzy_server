const db = require("../db/conn")

const TagSchema = db.Schema({
    name:String
})

module.exports = db.model("tag", TagSchema, "tag")