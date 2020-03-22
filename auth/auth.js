const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
    // 1.获取到re中请求头的AccessToken
    let token = ctx.header.AccessToken
    console.log(token)
    // 2.判断token是否存在
    if (!token) {
        // 不存在就不允许访问
        ctx.body={
            info:"尚未登录"
        }
        return
    } else {
        //校验合法性
        jwt.verify(token, 'zzytoken', (err, data) => {
            if (err) {
                // 校验案失败
               ctx.status = 403
            } else {
                // 校验通过，放行
                // 后续的代码可能需要使用到 token 中的数据（payload），为了省去后续中再次调用verify。这时候将payload信息，写到req对象上
                ctx.status = 200
                ctx.body.user_info = data;
                next()
            }
        })
    }
}