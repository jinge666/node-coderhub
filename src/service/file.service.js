const connection = require('../app/database')

class fileService {
  async createAvatar (filename,mimetype,size,userId) {
    const statement = `
      INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?)
    `
    const [result] = await connection.execute(statement,[filename,mimetype,size,userId])
    return result
  }
  async getAvatarInfoByUserId(userId) {
    const statement = `
      SELECT * FROM avatar WHERE user_id = ? ;
    `
    const [result] = await connection.execute(statement,[userId])
    return result[0]
  }
  async createFile(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId]);
    return result;
  }
  async getFileInfoByFilename(filename) {
    let statement = `
      SELECT * FROM file WHERE filename = ? ;
    `
    const [result] =await connection.execute(statement,[filename])
    return result[0]
  }
}

module.exports = new fileService()