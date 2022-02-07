const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require('../app/config')

const loginController = (ctx,next) => {
  const user = ctx.user
  const token = jwt.sign(user,PRIVATE_KEY,{
    expiresIn:60 * 60 * 24,
    algorithm:"RS256"
  })
  ctx.body = {
    id:user.id,
    name:user.name,
    token
  }
}

module.exports = {
  loginController
}