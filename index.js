const Koa = require('koa');
const app = module.exports = new Koa();

const logger = require('koa-logger')
const route = require('koa-route')
const bodyparse = require('koa-bodyparser')
const cors = require('koa2-cors');
const auth = require('./auth/auth')

app.use(logger())
app.use(bodyparse())
// 跨域
// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     await next();
// });

// app.use(async (ctx, next)=> {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     if (ctx.method == 'OPTIONS') {
//       ctx.body = 200; 
//     } else {
//       await next();
//     }
//   });
// app.use(async function(ctx) {
//   ctx.body = 'Hello World';
// });
// app.use(auth)

app.use(cors())
var handler = require('./handler/handler')

app.use(route.get('/',handler.test))
app.use(route.post('/',handler.test))

app.use(route.get('/getNewsList',handler.getNewsList))
app.use(route.get('/getNewsById',handler.getNewsById))
app.use(route.get('/getNewsByTag',handler.getNewsByTag))
app.use(route.post('/addNews',handler.addNews))
app.use(route.get('/getTagList',handler.getTagList))
app.use(route.get('/getCommentList',handler.getCommentList))
app.use(route.post('/addComment',handler.addComment))
app.use(route.post('/login',handler.login))

if (!module.parent) app.listen(3000);
console.log("server start at port 3000..")