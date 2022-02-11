const fs = require('fs')

const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const {AVATAR_PATH} = require('../constants/file-path')

class UserController {
  async create(ctx,next) {
    // 获取参数
    const query = ctx.request.body
    // 操作数据库
    const result = await userService.create(query)
    // 返回结果
    ctx.body = result
  }
  async getAvatar(ctx,next) {
    // 获取参数
    const {userId} = ctx.params
    // 通过userId获取图片相关信息
    const avatarIofo = await fileService.getAvatarInfoByUserId(userId)
    console.log('avatarIofo',avatarIofo);
    // 提供图像信息
    ctx.response.set('content-type',avatarIofo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarIofo.filename}`)
  }
}

module.exports = {
  create
} = new UserController