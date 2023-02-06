"use strict";

const { Controller } = require("egg");

class InformationController extends Controller {
  // 创建一个新学员
  async create() {
    const { ctx, service } = this;
    // ctx.body全称是ctx.response.body返回的数据
    const data = ctx.request.body;
    const res = await service.information.create(data);
    console.log("create", res);
    // if (res.code === 0) {
    //   await service.statisticsInformation.createSpecialized(data);
    //   await service.statisticsInformation.createPost(data);
    //   await service.statisticsInformation.createEnterprise(data);
    // }
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 查询列表页
  async findAll() {
    const { ctx, service } = this;
    // ctx.body全称是ctx.response.body返回的数据
    const data = ctx.request.body;
    const res = await service.information.findAll(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 删除单个学员
  async removeOneInformation() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log("data", data);
    const res = await service.information.deleteOneInformation(data);
    console.log("res", res);
    // if (res.code === 0) {
    //   await service.statisticsInformation.deleteSpecialized(data);
    //   await service.statisticsInformation.deletePost(data);
    //   await service.statisticsInformation.deleteEnterprise(data);
    // }
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 修改就业学员信息
  async updateOneInformation() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log('data三',data);
    const res = await service.information.updateOneInformation(data);
    console.log('res',res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 回显数据
  async echoOneInformationData() {
    const { ctx, service } = this;
    const { phone } = ctx.params;
    const res = await service.information.echoOneInformationData(phone);
    console.log("hui res", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = InformationController;
