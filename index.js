const Koa = require('koa');
const app = module.exports = new Koa();

const logger = require('koa-logger')
const route = require('koa-route')
const bodyparse = require('koa-bodyparser')

app.use(logger())
app.use(bodyparse())
// 跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});
// 跨域
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });
// app.use(async function(ctx) {
//   ctx.body = 'Hello World';
// });
var handler = require('./handler/handler')

app.use(route.get('/',handler.test))
app.use(route.get('/getNewsList',handler.getNewsList))
app.use(route.get('/getNewsById',handler.getNewsById))
app.use(route.post('/addNews',handler.addNews))


if (!module.parent) app.listen(3000);
console.log("server start at port 3000..")