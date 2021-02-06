// process.env.NODE_ENV
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { getCookieExpires } = require('./src/utils/getCookieExpires')

// 用于处理 post data 
const getPostData = (req) => {
  const p = new Promise((resolve, reject) => {
    // if (req.method !== 'POST') {
    //   resolve({})
    //   return
    // }
    // if (req.headers['Content-type'] !== 'application/json') {
    //   resolve({})
    //   return
    // }

    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })

  return p;
}

const serverHandler = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1])

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0]
    const val = arr[1]
    req.cookie[key] = val;
  });
  console.log('cookie is ', req.cookie)

  // 解析session
  let needSetCookie = false
  let userId = req.cookie.userid

  // 解析session 使用redis
  if (!userId) {
    needSetCookie = true;
    userId = Date.now()
    set(userId, {})
  }

  // 获取session
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {  // 异步
    if (sessionData == null) {
      set(req.sessionId, {})
      req.session = {}
    } else {
      req.session = sessionData
    }
    console.log('redis req session', req.session)
    return getPostData(req);
  }).then(postData => {
    console.log('postData', postData)
    req.body = postData;

    // 处理路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }

    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 未命中
    res.writeHeader(404, { "Content-type": 'text/plain' })
    res.write("404 Not Found\n")
    res.end()

  })
}

module.exports = serverHandler;
