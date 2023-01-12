"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  async adminLogin() {
    // 从this中获取ctx和service
    const { ctx, service } = this;
    // 从ctx.request中获取body
    const data = ctx.request.body;

    // 把body传递给service，然后service去操作model数据库
    const res = await service.admin.adminLogin(data);
    // 不再用原先的response，封装了个success方法，不管怎么样都会返回数据
    // ctx.body = res;
    console.log('----',res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 退出登录
  async adminLogout() {
    const { ctx, service } = this;
    const res = await service.admin.adminLogout();
    ctx.helper.success({
      ctx,
      res,
    });
  }
  async adminRemove() {
    // 从this中获取ctx和service
    const { ctx, service } = this;
    // 从ctx.request中获取body
    const { id } = ctx.params;
    // console.log('id',id);
    // 把body传递给service，然后service去操作model数据库
    const res = await service.admin.adminRemove(id);
    ctx.body = res;
  }
  async adminCreate() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.admin.adminCreate(data);
    ctx.body = res;
  }

}

module.exports = LoginController;
