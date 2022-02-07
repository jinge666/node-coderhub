const Router = require('koa-router')

const {verifyAuth} = require('../middleware/login.middleware')
const {verifyPermission} = require('../middleware/moment.middleware')
const {create} = require('../service/moment.service')
const {detail,list,update,remove} = require('../controller/moment.controller')

const momentRouter = new Router({prefix:'/moment'})

momentRouter.post('/',verifyAuth,create)
momentRouter.get('/:momentId',detail)
momentRouter.get('/',list)
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)

module.exports = momentRouter