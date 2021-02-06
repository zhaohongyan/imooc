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

// getFileContent('a.json').then((aData) => {
//   console.log('a==', aData)
//   return getFileContent(aData.next)
// }).then(bData => {
//   console.log('b==', bData)
//   return getFileContent(bData.next)
// }).then(cData => {
//   console.log('c==', cData)
// })

//  同步写法
// async function readFileData() {
//   const aData = await getFileContent('a.json');
//   console.log('a==', aData)
//   const bData = await getFileContent(aData.next);
//   console.log('b==', bData)
//   const cData = await getFileContent(bData.next);
//   console.log('c==', cData)
// }

// readFileData()

// async await 总结
// async 函数执行返回的是 promiese
// await 后面可以追加 promsie 对象，获取resolve的值
// try-catch 截获promise 中 reject 的值

async function readAData() {
  const aData = await getFileContent('a.json');
  return aData
}

async function test() {
  const aData = await readAData();
  console.log(aData)
}

test()