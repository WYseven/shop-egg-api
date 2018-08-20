'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  console.log(app.router.namespace)
  const apiV1Router = app.router.namespace('/api/v1');
  const { controller, middleware } = app;
  
  const auth = app.middleware.auth();
  
  // 用户登录注册
  apiV1Router.post('/login', controller.user.user.login);
  apiV1Router.post('/register', controller.user.user.register);

  apiV1Router.get('/shop_list', controller.shop.shop_list)
  apiV1Router.get('/shop_skus', controller.shop.shop_skus)
  apiV1Router.get('/shop_detail', controller.shop.shop_detail)

  // 购物车增删改查
  apiV1Router.get('/add_car', auth,controller.car.add_car)
  apiV1Router.get('/remove_car', auth,controller.car.remove_car)
  apiV1Router.get('/shop_car', auth,controller.car.shop_car)
  apiV1Router.get('/checkout', auth,controller.car.checkout);
};
