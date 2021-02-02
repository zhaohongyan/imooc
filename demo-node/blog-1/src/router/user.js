const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getCookieExpires } = require('../common/utils');
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 先用get
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    // const { username, password } = req.body;
    const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username
        req.session.realname = data.realname

        set(req.sessionId, req.session)

        console.log('req session is ', req.session)

        return new SuccessModel({
          session: req.session
        });
      } else {
        return new ErrorModel('登录失败');
      }
    })
  }

  // 测试登录
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }));
    }
    return Promise.resolve(new ErrorModel('尚未登录'));
  }
}

module.exports = handleUserRouter;
