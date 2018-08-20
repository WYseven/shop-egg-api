'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class UserController extends Controller {
  async login() {
    
    let { ctx } = this;
    let { username = '', password = '' } = ctx.request.body;

    username = username.trim();
    password = password.trim();
    if (!username || !password) {
      return ctx.body = {
        success: false,
        errorCode: 1,
        error: '用户名或密码输入不能为空'
      }
    }

    let user = await this.service.user.queryUserByUsername(username);

    if(!user){
      return ctx.body = {
        success: false,
        errorCode: 1,
        error: '用户名不存在'
      }
    }

    let pass = ctx.helper.bcompare(password,user.password);

    if(!pass){
      return ctx.body = {
        success: false,
        errorCode: 1,
        error: '密码不正确'
      }
    }
    
    const token = jwt.sign({
      id: user._id,
    },this.app.config.jwt.key,{
      expiresIn: this.app.config.jwt.date
    });
    
    this.ctx.body = {
      user_info:{username: user.username,_id:user._id},
      token,
      success: true,
      errorCode: 0,
      error: '可以登录'
    }
  }
  async register () {
    let { ctx} = this;
    let { username = '', password = '' } = ctx.request.body;

    username = username.trim();
    password = password.trim();
    if (!username || !password) {
      return ctx.body = {
        success: false,
        errorCode: 1,
        error: '用户名或密码输入不能为空'
      }
    }

    let user = await this.service.user.queryUserByUsername(username);
    if(user){
      return ctx.body = {
        success: false,
        errorCode: 1,
        error: '用户名已经存在'
      }
    }
    //console.log('注册', username, password, user)
    // 开始注册
    try{
      password = ctx.helper.bhash(password)
      let newUser = await this.service.user.saveNewUser(username,password);
      
      // 注册成功，发送cookie过去
     this.ctx.cookies.set('count', 'hello');  
      this.ctx.body = {
        success: true,
        errorCode: 0,
        error: '注册成功'
      };
    }catch(e){
      console.log(e)
      this.ctx.body = {
        success: false,
        errorCode: 1,
        error: '服务端出问题'
      };
    }
  }
}

module.exports = UserController;
