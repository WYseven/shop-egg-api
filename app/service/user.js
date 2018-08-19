'use strict';
const Service = require('egg').Service;


class UserService extends Service {
  /* 
    根据用户名查找用户
    @param {string} username 用户名
    @return {Promise[user]} 承载用户的 Promise 对象
  */
  queryUserByUsername(username) {
    if (username === this.config.admin.username) {
      return Promise.resolve({ ...this.config.admin })
    }
    const query = { username: { $in: username } };
    return this.ctx.model.User.findOne(query)
  }
  /* 
    根据用户名注册用户
    @param {string} username 用户名
    @param {string} password 密码
    @return {Promise[user]} 承载用户的 Promise 对象
  */
  async saveNewUser(username,password) {
    
    let User = new this.ctx.model.User();
    User.username = username;
    User.password = password;
    
    return User.save()
  }
}

module.exports = UserService;