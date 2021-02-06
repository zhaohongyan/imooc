const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db');

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

function exec(sql) {
  const p = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })

  return p;
}

module.exports = {
  exec,
  escape: mysql.escape // 防止sql注入攻击
}