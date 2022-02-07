const {getMomentById,getMoment,update,remove} = require('../service/moment.service')

class momentController {
  async detail(ctx,next) {
    const momentId = ctx.params.momentId
    const result = await getMomentById(momentId)
    ctx.body = result[0]
  }
  async list(ctx,next) {
    const offset = ctx.query.offset
    const limit = ctx.query.limit
    const result = await getMoment(offset,limit)
    ctx.body = result
  }

  async update (ctx,next) {
    const momentId = ctx.params.momentId
    const content = ctx.request.body.content
    const result = await update(momentId,content)
    ctx.body = '修改数据成功~'
  }

  async remove (ctx,next) {
    let momentId = ctx.params.momentId
    const result = await remove(momentId)
    ctx.body = '删除成功~'
  }
}

module.exports = new momentController()