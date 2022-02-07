const connection = require('../app/database')

class UserService {
  async create (user) {
    const {name,password} = user
    const statement = `
      INSERT INTO user (name,password) VALUES (?,?);
    `
    const result = await connection.execute(statement,[name,password])
    return result
  }
  async getUserByName (user) {
    const {name} = user
    const statement = `
    SELECT * FROM user WHERE name = ?
    `
    const result =await connection.execute(statement,[name])
    return result[0]
  }
}

module.exports = {
  create,
  getUserByName
} = new UserService()