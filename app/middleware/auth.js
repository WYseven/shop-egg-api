const jwt = require('jsonwebtoken')
module.exports = () => {
  return async function auth(ctx, next) {
    let token = ctx.get('Authorization');
    try {
      let decode = jwt.verify(ctx.get('Authorization'), ctx.app.config.jwt.key)
      ctx.user_id = decode.id
    } catch (err) {
      // 登录过期
      if(err.name === 'TokenExpiredError'){
        ctx.status = 401
        ctx.body = {
          errcode: 1,
          msg: 'token过期，请重新登录'
        }
        return
      }else{  // 没有token
        ctx.status = 401
        ctx.body = {
          errcode: 1,
          msg: '授权失败，请重新登录'
        }
        return
      }
      
    }
    await next() // 这里因为next之后的操作是异步的所以需要加 await
  };
};