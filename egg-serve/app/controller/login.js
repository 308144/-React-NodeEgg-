"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  // 登录查询用户
  async adminLogin() {
    // 从this中获取ctx和service
    const { ctx, service } = this;
    // 从ctx.request中获取body
    const data = ctx.request.body;

    // 把body传递给service，然后service去操作model数据库
    const res = await service.admin.adminLogin(data);
    // 不再用原先的response，封装了个success方法，不管怎么样都会返回数据
    // ctx.body = res;
    console.log("----", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 查询所有用户列表
  // 登录查询用户
  async findAllUser() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.admin.findAllUser(data);
    // console.log('findAllUser----',res);
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
  // 删除用户
  async adminRemove() {
    // 从this中获取ctx和service
    const { ctx, service } = this;
    // 从ctx.request中获取body
    const { id } = ctx.params;
    // console.log('id',id);
    // 把body传递给service，然后service去操作model数据库
    const res = await service.admin.adminRemove(id);
    console.log("adminRemove", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 创建用户
  async adminCreate() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    // console.log('data',data);
    const res = await service.admin.adminCreate(data);
    // console.log('res',res);
    ctx.helper.success({
      ctx,
      res,
    });
  }

    // 回显数据
    async echoOneUserData() {
      const { ctx, service } = this;
      const { userName } = ctx.params;
      const res = await service.admin.echoOneUserData(userName);
      console.log("hui res", res);
      ctx.helper.success({
        ctx,
        res,
      });
    }
    // 修改数据
    async updateUser() {
      const { ctx, service } = this;
      const data = ctx.request.body;
      console.log(data);
      const res = await service.admin.updateUser(data);
      ctx.helper.success({
        ctx,
        res,
      });
    }
    // 下载批量上传的excel文件
    async uploadExcle() {
      const { ctx, service } = this;
      const data=ctx.request.files
      const res = await service.admin.uploadExcle(data);
      ctx.helper.success({
        ctx,
        res,
      });
    }
}

module.exports = LoginController;
