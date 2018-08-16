'use strict';
const Service = require('egg').Service;
const axios = require('axios');
const baseURL = 'https://www.smartisan.com/product';
axios.defaults.baseURL = baseURL;

class ShopService extends Service {
  getShopList(query) {
    
    let defaults = {
      page_size:20,
      page:1,
      category_id:60,
      sort:"sort"
    }
    Object.assign(defaults,query);

    return axios.get('/spus', {
      params: defaults
    }).then((data) => {
      let list = []
      try{
        list = this.ctx.helper.filterListData(data.data.data.list);
        list = list.map((item) => {
          return {
            ...item,
            sku_list: [item.sku_list[0]]
          }
        })
      }catch(e){
        console.log('解析数据错误',e)
      }finally{
        return list;
      }
    })
  }

  getshopSkus(query){
    let defaults = { ids : '', with_spu : false, with_stock : true };
    Object.assign(defaults,query);
    return axios.get('/skus',{
      params: defaults
    }).then(({data}) => {
      let list = []
      try {
        list = this.ctx.helper.filterSku(data.data.list);
      } catch (e) {
        console.log('解析数据错误', e)
      } finally {
        return list;
      }
    })
  }

  getshopDetail(query){
    let defaults = { ids: ''};
    Object.assign(defaults, query);
    return axios.get('/spus', {
      params: defaults
    }).then(({ data}) => {
      let list = [];
      return data.data.list;
    })
  }
}

module.exports = ShopService;