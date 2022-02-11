const connection = require('../app/database')

class lableService {
  async createLable (name) {
    const statement = `INSERT INTO lable (name) VALUES (?);`
    const result = await connection.execute(statement,[name])
    return result[0]
  }
  async getLableByName (name) {
    const statement = `
      SELECT * FROM lable WHERE name = ? ;
    `
    const result =await connection.execute(statement,[name])
    return result[0]
  }
  async lableAssocmoment (momentId,lableId) {
    const statement = `
      INSERT INTO moment_lable (moment_id,lable_id) VALUES (?,?);
    `
    const result = await connection.execute(statement,[momentId,lableId])
    return result[0]
  }
  async lableExtists (momentId,lableId) {
    const statement = `
      SELECT * FROM moment_lable WHERE moment_id = ? AND lable_id = ? ;
    `
    const result = await connection.execute(statement,[momentId,lableId])
    return result[0].length === 0 ? false : true
  }
}

module.exports = new lableService