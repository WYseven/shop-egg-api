'use strict';

const Controller = require('egg').Controller;

class CarController extends Controller {
  // 获取商品列表数据
  // id number
  async add_car() {

    let { ctx } = this;

    let data = await this.service.car.addCarService(ctx.request.query);
    let result = {
      success: true,
      code: 0,
      list: data
    }
    // sku_id和user_id不能为空
    if(!data){
      result.code = 1;
      result.success = false,
      result.errorMes = '不能为空'
    }
    ctx.body = result;
  }

  // 删除对应的商品
  async remove_car(){
    let { ctx } = this;

    let data = await this.service.car.removeCarService(ctx.request.query);
    let result = {
      success: true,
      code: 0
    }
    if (!data.isRemoveAll){
      Object.assign(result, {
        code: 1, success: false, 
        errorMes: '不能为空或删除的商品不存在', 
        notFoundIds: data.notFoundIds})
    }
    ctx.body = result;
  }

  // 根据用户查询用户购物车的商品
  async shop_car(){
    let { ctx } = this;

    let data = await this.service.car.getShopCar(ctx.request.query);

    ctx.body = {
      code:0,
      success: true,
      list: data
    }
  }

  // 记录要计算的商品
  async checkout() {
    let { ctx } = this;
    let data = await this.service.car.setShopCheckout(ctx.request.query);
    let result = {
      code: 0,
      success: true,
      list: data
    };
    if(!data){
      result.code = 1;
      result.success = false;
      result.errorMes = '请输入用户的id';
    }

    ctx.body = result
  }
}

module.exports = CarController;
