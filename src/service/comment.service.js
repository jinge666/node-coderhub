const connection = require('../app/database')

class commentService {
  async createComment(id,momentId,content) {
    const statement = `
      INSERT INTO comment (user_id,moment_id,content) VALUES (?,?,?);
    `
    const result = await connection.execute(statement,[id,momentId,content])
    return result[0]
  }

  async replyComment (id,momentId,content,commentId) {
    const statement = `
      INSERT INTO comment (user_id,moment_id,content,comment_id) VALUES (?,?,?,?);
    `
    const result = await connection.execute(statement,[id,momentId,content,commentId])
    return result[0]
  }
  async updateComment (commentId,content) {
    const statement = `
      UPDATE comment SET content = ? WHERE id = ?;
    `
    const result = await connection.execute(statement,[content,commentId])
    return result[0]
  }
  async removeComment (commentId) {
    const statement = `
      DELETE FROM comment WHERE id = ?;
    `
    const result = await connection.execute(statement,[commentId])
    return result[0]
  }
}

module.exports = new commentService()