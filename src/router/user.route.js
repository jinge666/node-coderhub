const Router = require('koa-router')

const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')
const {
  create,
  getAvatar
} = require('../controller/user.controller')

const userRouter = new Router({prefix:'/users'})

userRouter.post('/',verifyUser,handlePassword,create)
userRouter.get('/:userId/avatar',getAvatar)

module.exports = userRouter