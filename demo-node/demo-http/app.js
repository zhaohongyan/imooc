const http = require('http')
const qs = require('querystring')

const app = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = req.url.split('?')[0];
  const query = qs.parse(req.url.split('?')[1]);

  res.setHeader('Content-type', 'application/json')

  const resData = {
    method,
    url,
    path,
    query
  }

  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  } else if (method === 'POST') {
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      resData.postData = JSON.parse(postData);
      console.log(resData.postData)
      res.end(JSON.stringify(resData))
    })
  }
})

app.listen(3001, () => {
  console.log('server is listening 3001')
})