const News = require('../model/news')
const Tag = require('../model/tag')
const Comment = require('../model/comment')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

module.exports.test = (ctx) => {
    ctx.body = "test page."
}
// 获取所有新闻
module.exports.getNewsList = async (ctx) => {
    let data = await News.find({})
    ctx.body = data
}
// 搜索新闻
module.exports.searchNews = async (ctx) => {
    let q = ctx.request.body
    console.log(q.key)
    let data = await News.find({'title': eval('/' + q.key + '/')})
    ctx.body = data
}
// 根据id获取某条新闻
module.exports.getNewsById = async (ctx) => {
    let q = ctx.query
    let data = await News.findById(q.id)
    ctx.body = data
}
// 根据tag获取新闻列表
module.exports.getNewsByTag = async (ctx) => {
    let q = ctx.query
    let data = await News.find({'tags':q.tag})
    ctx.body = data
}
// 根据 author 获取新闻列表
module.exports.getNewsByAuthor = async (ctx) => {
    let q = ctx.query
    let data = await News.find({'author':q.author})
    ctx.body = data
}
// 添加新闻
module.exports.addNews = async (ctx) => {
    let data = ctx.request.body
    let news = new News(data)
    news.save().then(res=>{
        ctx.response.body = "发布成功"  //bug 页面返回不了信息，待解决
    }).catch(err=>{
        ctx.response.body = "发布失败"
        console.log(err.message)
    })
    ctx.response.body = "发布成功"
}
// 获取tag列表
module.exports.getTagList = async (ctx) => {
    let data = await Tag.find({})
    ctx.body = data
}
// 获取某条新闻评论
module.exports.getCommentList = async (ctx) => {
    let q = ctx.query
    let data = await Comment.find({'news_id':q.news_id})
    ctx.body = data
}
// 删除新闻
module.exports.deleteNewsById = async (ctx) => {
    let b = ctx.request.body
    res = await News.deleteOne({_id:b.id})
    console.log(res)
    ctx.body = "删除成功"
}
// 添加评论
module.exports.addComment = async (ctx) => {
    let data = ctx.request.body
    let cm = new Comment(data)
    cm.save().then(res=>{
        ctx.response.body = "添加成功"
    }).catch(err=>{
        ctx.response.body = err.message
    })
    ctx.response.body = "添加成功"
}
// 用户登录
module.exports.login = async (ctx) => {
    let u = ctx.request.body
    let user = await User.findOne({username:u.username})
    if(user){
        if(user.password == u.password){
            // 登陆成功，生成令牌
            const token = jwt.sign({
                user_id: user._id
              },
              "zzytoken", {
                expiresIn: "1h"
              }
            );
            let tmp = {
              user_info: {
                user_id: user._id,
                username: user.username
              },
              token: token,
              info:"登录成功"
            }
            ctx.response.body=tmp
        }else{
            ctx.body = {
                info:"密码错误"
            }
        }
    }else{
        ctx.body = {
            info:"该用户不存在"
        }
    }
}
// 用户注册
module.exports.register = async (ctx)=>{
    let u = ctx.request.body
    let user = new User(u)

    user.save().then(res=>{
        ctx.response.body = "注册成功"
    }).catch(err=>{
        ctx.response.body = err.message
    })

    ctx.response.body = "注册成功"
}
// 根据 author 获取评论
module.exports.getCommentByAuthor = async (ctx) => {
    let q = ctx.query
    console.log(q)
    let data = await Comment.find({'user':q.author})
    ctx.body = data
}
// 删除新闻
module.exports.deleteCommentById = async (ctx) => {
    let b = ctx.request.body
    res = await Comment.deleteOne({_id:b.id})
    console.log(res)
    ctx.body = "删除成功"
}