- cross-env 设置环境变量 NODE_ENV=dev
- nodemon 可以监听文件变化 重启 node
- pm2
- postman 的使用

## 零框架

### MySql

- workBench 的使用
- sql 语句 二八原则 80%的需求只需 20%的知识就能解决

### 注意事项

- 不能使用 ESModule 语法，只能使用 common.js, (const a = require('a.js'))

### 博客项目

- 需求
  用户登录
  博客列表，详情，新增，编辑，删除

- 技术方案
  router 路由信息
  controller 数据信息

- 开发接口

  - /api/blog/list get
  - /api/blog/detail get
  - /api/blog/new post
  - /api/blog/update post
  - /api/blog/del post
  - /api/user/login post

- 数据库设计
  - blogs
    id title content author createTime
  - users
    id username password realname

操作数据库

- 建库
- 建表
- 表操作

#### 登录
- 核心：登录校验 & 登录信息存储
- 为何只讲登录，不讲注册？
- cookie session
- session 写入 redis   redis-内存数据库 mysql-硬盘数据库
- 开发登录功能， 和前端联调 用到 nginx 反向代理

cookie
- 存储在浏览器端的一段字符串，最大5kb
- 跨域不共享
- 格式如 k1=v1;k2=v2;k3=v3; 因此可以存储结构化数据
- 每次发送http请求，会将请求域的 cookie 一起发送给server
- server可以修改 cookie 并返回给浏览器
- 浏览器中可以通过js修改cookie , **有限制**

查看cookie
- network , request headers Cookies, response headers Set-Cookie
- application cookie
- js, document.cookie='k1=100;', 追加的方式