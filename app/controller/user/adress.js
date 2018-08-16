'use strict';

const Controller = require('egg').Controller;

class AdressController extends Controller {
  async adress() {

    let { ctx } = this;

    this.ctx.body = 123
  }
}

module.exports = AdressController;
