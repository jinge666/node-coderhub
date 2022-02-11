const Router = require('koa-router')

const {verifyAuth} = require('../middleware/login.middleware')
const {verifyPermission} = require('../middleware/moment.middleware')
const {create} = require('../service/moment.service')
const {detail,list,update,remove,lableTomoment,fileInfo} = require('../controller/moment.controller')
const {verifyLableExtists} = require('../middleware/lable.middleware')

const momentRouter = new Router({prefix:'/moment'})

momentRouter.post('/',verifyAuth,create)
momentRouter.get('/:momentId',detail)
momentRouter.get('/',list)
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)
// 关联标签
momentRouter.post('/:momentId/lable',verifyAuth,verifyPermission,verifyLableExtists,lableTomoment)
// 查看图片
momentRouter.get('/images/:filename', fileInfo);

module.exports = momentRouter