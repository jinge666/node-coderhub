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
      SELECT
        m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) author,
        IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) lables,
        #子查询
        (SELECT IF(COUNT(c.id),
          JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,
            'user',JSON_OBJECT('id',cu.id,'name',cu.name)
          )),NULL) FROM comment c 
          LEFT JOIN user cu ON c.user_id = cu.id 
          WHERE m.id = c.moment_id) comments,
        #子查询
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename))
          FROM file WHERE m.id = file.moment_id
        ) images
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN moment_lable ml ON ml.moment_id = m.id
      LEFT JOIN lable l ON l.id = ml.lable_id
      WHERE m.id = ?
      GROUP BY m.id;
    `
    const result = await connection.execute(statement,[id])
    return result[0]
  }

  async getMoment(offset,limit) {
    let statement = `
      SELECT
        m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_lable ml WHERE ml.moment_id = m.id) lableCount
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
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