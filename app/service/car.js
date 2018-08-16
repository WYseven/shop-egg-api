'use strict';
const Service = require('egg').Service;

class CarService extends Service {

  // 添加购物车
  async addCarService(query) {
    let defaults = { sku_id :  '', buy_number: 1,user_id: "" };

    Object.assign(defaults,query);

    if (defaults.sku_id.trim() === '') return;
    if (defaults.user_id.trim() === '') return;
    let Car = this.ctx.model.Car;
    // 下查询一下是否存在
    let item = await Car.findOne({ sku_id: defaults.sku_id, user_id: defaults.user_id})

      if(item){  // 已存在，更新数量
        await Car.update({ sku_id: defaults.sku_id }, { buy_number: defaults.buy_number});
        
      }else{
        item = new Car(defaults);
        await item.save();
      }
      // 拿到所有在购物车中的商品
    item = await Car.find({ user_id: defaults.user_id })
      // 得到sku_id的数据，返回
    let list = [];
    for(let i = 0; i < item.length; i++){
      let data = await this.ctx.service.shop.getshopSkus({ ids: item[i].sku_id });
      list.push(Object.assign(data[0], item[i].toJSON()));
    }  
    
    return list;
  }

  // 删除购物车
  async removeCarService(query) {
    let defaults = { sku_id: '', user_id: "" };
    Object.assign(defaults, query);

    if (defaults.sku_id.trim() === '') return;
    if (defaults.user_id.trim() === '') return;
    let Car = this.ctx.model.Car;
    // 下查询一下是否存在

    let arr = defaults.sku_id.split(',');
    let isRemoveAll = true;
    let notFoundIds = [];
    // 循环删除多项
    for (let i = 0; i < arr.length; i++) {
      let querys = { sku_id: arr[i], user_id: defaults.user_id };
      let item = await Car.findOne(querys);
      if (item) {
        await Car.remove(querys)
      } else {
        isRemoveAll = false;
        notFoundIds.push(arr[i])
      }
    }
    return {
      isRemoveAll,
      notFoundIds
    }
  }
  // 获取购物车的数据
  async getShopCar(query) {
    let defaults = { user_id: "" };
    Object.assign(defaults, query);

    if (defaults.user_id.trim() === '') return;
    let Car = this.ctx.model.Car;

    let datas = await Car.find(defaults);
    let list = [];
    for (let i = 0; i < datas.length; i++) {
      let shop = await this.ctx.service.shop.getshopSkus({ ids: datas[i].sku_id });
      list.push(Object.assign(shop[0], datas[i].toJSON()))
    }
    return list;
  }
  // 记录要结算的数据
  async setShopCheckout(query) {
    let defaults = { sku_id: "",user_id: '' };
    Object.assign(defaults, query);
    
    if (defaults.user_id.trim() === '') return;

    // 如果传入的sku_id有值，说明是要设置要结算的商品，没有值，直接返回要结算的商品
    if (defaults.sku_id.trim()){

      let idsArr = defaults.sku_id.split(',');
  
      let Car = this.ctx.model.Car;
  
      // 把其他的的购买状态都更新为false
      let allShop = await Car.find({ user_id: defaults.user_id, account: true });
      for (let i = 0; i < allShop.length; i++) {
        if (!idsArr.some(o => o === allShop[i].sku_id)) {
          allShop[i].account = false;
          await allShop[i].save();
        }
      }
      for (let i = 0; i < idsArr.length; i++){
        let item = await Car.update({ sku_id: idsArr[i],user_id: defaults.user_id}, { account: true});
      }
    }
    // 拿到商品的信息
    let list = await this.ctx.service.car.getShopCar({ user_id: defaults.user_id, account: true});
    return list;
  }
}

module.exports = CarService;