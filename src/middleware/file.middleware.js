const Multer = require('koa-multer')
const {AVATAR_PATH,PICTURE_PATH} = require('../constants/file-path')

const avatarUpload = Multer({
  dest:AVATAR_PATH
});
const pictureUpload = Multer({
  dest:PICTURE_PATH
})

const avatarHandler = avatarUpload.single('avatar')
const pictureHandler = pictureUpload.array('picture',9)  //9设置数组最大长度为9

module.exports = {
  avatarHandler,
  pictureHandler
}