// process.env.NODE_ENV
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 用于处理 post data 
const getPostData = (req) => {
  const p = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

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

  // 处理 post data
  getPostData(req).then(postData => {
    req.body = postData;

    // 处理路由
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData))
    //   return
    // }

    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return 
    }
    
    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(JSON.stringify(userData))
    //   return
    // }

    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
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
