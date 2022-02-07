const Router = require('koa-router')

const {loginController} = require('../controller/login.controller')
const {verifyLogin,verifyAuth} = require('../middleware/login.middleware')

const loginRouter = new Router({prefix:'/login'})

loginRouter.post('/',verifyLogin,loginController)
loginRouter.get('/test',verifyAuth)

module.exports = loginRouter

