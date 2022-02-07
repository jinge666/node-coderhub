const connection = require('../app/database')

const sql = `
  SELECT 
    m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name) author
  FROM moment m
  LEFT JOIN user u ON m.user_id = u.id
` 

class momentService{
  async create (ctx,next) {
    const id = ctx.user.id
    const content = ctx.request.body.content
    const statement = `
      INSERT INTO moment (user_id,content) VALUES (?,?);
    `
    const result = await connection.execute(statement,[id,content])
    ctx.body = result
  }

  async getMomentById (id) {
    let statement = `
      ${sql}
      WHERE m.id = ?;
    `
    const result = await connection.execute(statement,[id])
    return result[0]
  }

  async getMoment(offset,limit) {
    let statement = `
      ${sql}
      LIMIT ?, ?
    `
    const result = await connection.execute(statement,[offset,limit])
    return result[0]
  }

  async update (id,content) {
    const statement = `
      UPDATE moment SET content=? WHERE id = ?;
    `
    const result = await connection.execute(statement,[content,id])
    return result[0]
  }

  async remove(id) {
    const statement = `
      DELETE FROM moment WHERE id = ? ;
    `
    const result = await connection.execute(statement,[id])
    return result[0]
  }
}

module.exports = new momentService()