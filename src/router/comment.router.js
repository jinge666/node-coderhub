const Router = require('koa-router')

const {verifyAuth} = require('../middleware/login.middleware')
const {create,reply,update,remove} = require('../controller/comment.controller')
const {verifyPermission} = require('../middleware/moment.middleware')

const commentRouter = new Router({prefix:'/comment'})

commentRouter.post('/',verifyAuth,create)
commentRouter.post('/:commentId/reply',verifyAuth,reply)
commentRouter.patch('/:commentId',verifyAuth,verifyPermission,update)
commentRouter.delete('/:commentId',verifyAuth,verifyPermission,remove)

module.exports = commentRouter