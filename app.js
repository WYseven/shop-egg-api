module.exports = app => {
  console.log('初始化');

  app.beforeStart(() => {
    console.log('启动')
  })
}