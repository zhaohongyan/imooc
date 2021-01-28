// 需求： 读取文件 next 
// 如果有next, 读取next 指向的文件，否则停止

const fs = require('fs')
const path = require('path')


function getFileContent(fileName, callback) {
  const fullpath = path.resolve(__dirname, 'files', fileName)
  fs.readFile(fullpath, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    callback(JSON.parse(data.toString()));
  })
}

// callback-hell 回调地狱
getFileContent('a.json', aData => {
  console.log('a data', aData)
  getFileContent(aData.next, bData => {
    console.log('b data', bData)
    getFileContent(bData.next, cData => {
      console.log('c data', cData)
    })
  })
})

