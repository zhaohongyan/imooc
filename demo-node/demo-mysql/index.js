const mysql = require('mysql')

// 创建连接
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: '3306',
  database: 'myblog'
})

// 开始连接
con.connect()

const sql = 'select * from blogs';
// const sql = 'select id,title from blogs';
// const sql = `update blogs set title='标题A' where title='标题C'`;
con.query(sql, (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(result)
});

// 关闭连接
con.end();