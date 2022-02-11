const Router = require('koa-router')

const {verifyAuth} = require('../middleware/login.middleware')
const {create} = require('../controller/lable.controller')

const lableRouter = new Router({prefix:'/lable'})

lableRouter.post('/',verifyAuth,create)

module.exports = lableRouter