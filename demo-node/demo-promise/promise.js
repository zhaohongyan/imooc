const fs = require('fs')
const path = require('path')

// 用promise获取文件内容
function getFileContent(fileName) {
  const fullpath = path.resolve(__dirname, 'files', fileName);
  const promise = new Promise((resolve, reject) => {
    fs.readFile(fullpath, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise;
}

getFileContent('a.json').then((aData) => {
  console.log('a==', aData)
  return getFileContent(aData.next)
}).then(bData => {
  console.log('b==', bData)
  return getFileContent(bData.next)
}).then(cData => {
  console.log('c==', cData)
})