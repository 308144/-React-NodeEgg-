'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body全称是ctx.response.body返回的数据
    ctx.body = 'hi, egg11';
  }
}

module.exports = HomeController;
