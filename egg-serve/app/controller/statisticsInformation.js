"use strict";

const { Controller } = require("egg");

class StatisticsInformationController extends Controller {


  // 查询列表页
  async findAll() {
    const { ctx, service } = this;
    // ctx.body全称是ctx.response.body返回的数据
    const data = ctx.params;
    const res = await service.statisticsInformation.findAll(data);
    // ctx.helper.success({
    //   ctx,
    //   res,
    // });
  }
  // 删除单个学员
  async removeOneInformation() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.information.deleteOneInformation(data);
    console.log("res", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 修改就业学员信息
  async updateOneInformation() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    // console.log('data',data);
    const res = await service.information.updateOneInformation(data);

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

module.exports = StatisticsInformationController;
