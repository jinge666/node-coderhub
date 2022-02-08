const {createComment,replyComment,updateComment,removeComment,getCommentByMomentId} = require('../service/comment.service')

class commentController {
  async create (ctx,next) {
    const {momentId,content} = ctx.request.body
    const {id} = ctx.user
    const result = await createComment(id,momentId,content)
    ctx.body = result
  }
  async reply (ctx,next) {
    const {momentId,content} = ctx.request.body
    const {commentId} = ctx.params
    const {id} = ctx.user
    const result = await replyComment(id,momentId,content,commentId)
    ctx.body = result
  }
  async update (ctx,next) {
    const {commentId} = ctx.params
    const {content} = ctx.request.body
    const result = await updateComment(commentId,content)
    ctx.body = result
  }
  async remove (ctx,next) {
    const {commentId} = ctx.params
    const result = await removeComment(commentId)
    ctx.body = result
  }
  async list (ctx,next) {
    const {momentId} = ctx.params
    const result = await getCommentByMomentId(momentId)
    ctx.body = result
  }
}

module.exports = {
  create,
  reply,
  update,
  remove,
  list
} = new commentController