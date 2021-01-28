const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const method = req.method
  const { username, password } = req.body;
  if (method === 'POST' && req.path === '/api/user/login') {
    const result = login(username, password);
    // if (result) {
    //   return new SuccessModel();
    // } else {
    //   return new ErrorModel('登录失败');
    // }
    return result.then(data => {
      if (data.username) {
      return new SuccessModel();
    } else {
      return new ErrorModel('登录失败');
    }
    })
  }
}

module.exports = handleUserRouter;
