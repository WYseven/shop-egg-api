'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533277726358_8610';

  // add your config here
  config.middleware = [];

  // 安全 csrf暂时关闭
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080']
  }

  // mongodb配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/smartisan',
    options: {},
  };

  // 最高权限用户名密码
  config.admin = {
    username:'admin',
    password: '123'
  };
  config.cors = {
    origin: 'http://localhost:8080',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  };

  // 设置jwt秘钥
  config.jwt = {
    key: 'test',
    date: '10s'
  }

  return config;
};
