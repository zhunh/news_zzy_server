const Koa = require('koa');
const app = module.exports = new Koa();

const logger = require('koa-logger')
const route = require('koa-route')
const bodyparse = require('koa-bodyparser')
const cors = require('koa2-cors');
const path = require('path')
const static = require('koa-static')
const auth = require('./auth/auth')

const staticPath = './static'

app.use(logger())
app.use(bodyparse())

app.use(static(path.join(__dirname, staticPath)))
// 跨域
app.use(cors())
var handler = require('./handler/handler')

app.use(route.get('/',handler.test))
app.use(route.post('/',handler.test))

app.use(route.get('/getNewsList',handler.getNewsList))
app.use(route.get('/getNewsById',handler.getNewsById))
app.use(route.get('/getNewsByTag',handler.getNewsByTag))
app.use(route.get('/getNewsByAuthor',handler.getNewsByAuthor))
app.use(route.post('/addNews',handler.addNews))
app.use(route.post('/searchNews',handler.searchNews))
app.use(route.get('/getTagList',handler.getTagList))
app.use(route.get('/getCommentList',handler.getCommentList))
app.use(route.post('/addComment',handler.addComment))
app.use(route.post('/login',handler.login))
app.use(route.post('/register',handler.register))
app.use(route.post('/deleteNewsById',handler.deleteNewsById))
app.use(route.get('/getCommentByAuthor',handler.getCommentByAuthor))
app.use(route.post('/deleteCommentById',handler.deleteCommentById))

if (!module.parent) app.listen(3000);
console.log("server start at port 3000..")