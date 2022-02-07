const service = require('../service/user.service')

class UserController {
  async create(ctx,next) {
    // 获取参数
    const query = ctx.request.body
    // 操作数据库
    const result = await service.create(query)
    // 返回结果
    ctx.body = result
  }
}

module.exports = {
  create
} = new UserController