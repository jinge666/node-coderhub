const {isPermission} = require('../service/auth.service')
const errorTypes = require('../constants/error-types')

const verifyPermission =async (ctx,next) => {
  let [scoreName] = Object.keys(ctx.params)
  // 动态获取表名
  let tableName = scoreName.replace('Id','')
  // 获取要查询的id
  let id = ctx.params[scoreName]
  let userId = ctx.user.id
  const result = await isPermission(tableName,id,userId)
  if(!result) {
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error',error,ctx)
  }
  await next()
}

module.exports = {
  verifyPermission
}