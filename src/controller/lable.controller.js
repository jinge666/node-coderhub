const service = require('../service/lable.service')

class lableController {
  async create (ctx,next) {
    const {name} = ctx.request.body
    const result = await service.createLable(name)
    ctx.body = result
  }
}

module.exports = new lableController