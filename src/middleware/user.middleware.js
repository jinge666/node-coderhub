const errorTypes = require('../constants/error-types')
const {getUserByName} = require('../service/user.service')
const {md5password} = require('../utils/password-handle')

const verifyUser = async (ctx,next) => {
  // 获取用户有和密码
  const {name,password} = ctx.request.body
  // 判断用户名和密码不能为空
  if(!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',error,ctx)
  }
  // 判断用户名是否已经存在
  const result = await getUserByName(ctx.request.body)
  if(result.length > 0) {
    const error = new Error(errorTypes.NAME_ALREADY_EXISTS)
    return ctx.app.emit('error',error,ctx)
  }
  await next()
}

// 对密码加密
const handlePassword = async (ctx,next) => {
  const {password} = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}