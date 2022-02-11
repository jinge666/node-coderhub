const fs = require('fs')
const path = require('path')

const {getMomentById,getMoment,update,remove} = require('../service/moment.service')
const lableService = require('../service/lable.service')
const fileService = require('../service/file.service')
const {PICTURE_PATH} = require('../constants/file-path')
const {pictureDispose} = require('../utils/picture-dispose')

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
  async lableTomoment (ctx,next) {
    let momentId = ctx.params.momentId
    let lableList = ctx.newLable
    for(let lable of lableList) {
      // 判断是否存在当前标签
      let exists = await lableService.lableExtists(momentId,lable.id)
      if(!exists) {
        // 不存在才会插入
        await lableService.lableAssocmoment(momentId,lable.id)
      }
    }
    ctx.body = `添加标签成功~`
  }
  async fileInfo (ctx,next) {
    const {filename} = ctx.params
    const fileInfo =await fileService.getFileInfoByFilename(filename)
    const {params} = ctx.query
    let newFile = await pictureDispose(filename,PICTURE_PATH,params)
    ctx.response.set('content-type',fileInfo.mimetype)
    // ctx.body = fs.createReadStream(`./${PICTURE_PATH}/${fileInfo.filename}`)
    ctx.body = fs.createReadStream(newFile)
  }
}

module.exports = new momentController()