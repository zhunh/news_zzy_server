const News = require('../model/news')
const Tag = require('../model/tag')

module.exports.test = async (ctx) => {
    ctx.body = "test page."
}

module.exports.getNewsList = async (ctx) => {
    let data = await News.find({})
    ctx.body = data
}

module.exports.getNewsById = async (ctx) => {
    let id = ctx.query
    let data = await News.findById(id.id)
    ctx.body = data
}

module.exports.addNews = async (ctx) => {
    let data = ctx.request.body
    console.log(data)
    ctx.body = data
}
