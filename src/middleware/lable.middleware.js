const service = require('../service/lable.service')

const verifyLableExtists =async (ctx,next) => {
  let momentId = ctx.params.momentId
  let {name} = ctx.request.body
  let newLable = []
  // 先检查数据库中是否存在当前的标签，存在就创建，否则直接存入
  for(item of name) {
    let lable = {name:item}
    const result = await service.getLableByName(item)
    if(result.length === 0) {
      const result = await service.createLable(item)
      lable.id = result.insertId
    }else{
      lable.id = result[0].id
    }
    newLable.push(lable)
  }
  ctx.newLable = newLable
  await next()
}

module.exports = {
  verifyLableExtists
}