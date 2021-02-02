### 零框架

- cross-env 设置环境变量 NODE_ENV=dev
- nodemon 可以监听文件变化 重启 node
- pm2
- MySql
- Redis
- Nginx

### MySql

- workBench 的使用
- sql 语句 二八原则 80%的需求只需 20%的知识就能解决

### Redis

```bash
# 安装
brew install redis

# 启动服务
redis-server

# 启动客户端
redis-cli

# 操作命令
set myname emma
get myname
del myname
keys *
```

### nginx

- 配置文件 mac: /usr/local/etc/nginx/nginx.conf

```bash
# 安装
brew install nginx

# 测试配置文件格式是否正确
nginx -t

# 启动
nginx

# 重启
nginx -s reload

# 停止
nginx -s stop
```

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

登录

- 核心：登录校验 & 登录信息存储
- 为何只讲登录，不讲注册？
- cookie session
- session 写入 redis redis-内存数据库 mysql-硬盘数据库
- 开发登录功能， 和前端联调 用到 nginx 反向代理

cookie

- 存储在浏览器端的一段字符串，最大 5kb
- 跨域不共享
- 格式如 k1=v1;k2=v2;k3=v3 因此可以存储结构化数据
- 每次发送 http 请求，会将请求域的 cookie 一起发送给 server
- server 可以修改 cookie 并返回给浏览器
- 浏览器中可以通过 js 修改 cookie , **有限制**

查看 cookie

- network , request headers Cookies, response headers Set-Cookie
- application cookie
- js, document.cookie='k1=100;', 追加的方式

cookie 用于登录验证

登录之后，server 端通过 res.setHeader('Set-Cookie': 'username=lisi;path=/;httpOnly;expires=')

session 用于登录存在的问题

- 目前 session 直接是 js 变量，放在 nodejs 进程内存中
- 第一 进程内存有限，访问量过大，内存暴增怎么办
- 第二 正式线上运行时多进程，进程之间内存无法共享

redis

- web server 最常用的缓存数据库，数据存放在内存中
- 相比 mysql 访问速度快 （内存和硬盘不是一个数量级的）
- 但是成本更高，可存储的数据量更小 （内存的硬伤）
- 将 web server 和 redis 拆分为两个单独的服务
- 双方都是独立的，都是可扩展的 例如都扩展成集群
- 包括 mysql, 也是一个单独的服务 也可扩展

为何 session 适合 redis

- session 访问频繁，对性能要求极高
- session 可不考虑断电丢失数据的问题
- session 数据量不会太大

PORT

- node 3000
- myapp 8001
