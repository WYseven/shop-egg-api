'use strict';

const Controller = require('egg').Controller;

class ShopController extends Controller {
  // 获取商品列表数据
  async shop_list() {

    let {ctx} = this;

    let data = await this.service.shop.getShopList(ctx.request.query)

      ctx.body = {
        success: true,
        code: 0,
        list: data
      }
  }

  // 获取具体商品信息
  async shop_skus(){
    let {ctx} = this;
    let data = await this.service.shop.getshopSkus(ctx.request.query)
    ctx.body = {
      success: true,
      code: 0,
      list: data
    }
  }
  
  // 在详情页获取商品信息
  async shop_detail(){
    let { ctx } = this;
    let data = await this.service.shop.getshopDetail(ctx.request.query)
    ctx.body = {
      success: true,
      code: 0,
      list: data
    }
  }
}

module.exports = ShopController;
