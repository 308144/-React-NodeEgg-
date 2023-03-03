"use strict";

const { Controller } = require("egg");

class RecruitmenController extends Controller {
  // recruitmen
  // 创建一个学院
  async recruitmenCreate() {
    const { ctx, service } = this;
    // ctx.body全称是ctx.response.body返回的数据
    const data = ctx.request.body;
    console.log("data", data);
    const res = await service.recruitmen.recruitmenCreate(data);
    console.log("recruitmenCreate", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 查询列表页
  async findAllRecruitmen() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.recruitmen.findAllRecruitmen(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 删除单个学院
  async removeOneRecruitmen() {
    const { ctx, service } = this;
    const data = ctx.params;
    console.log('data',data);
    const res = await service.recruitmen.removeOneRecruitmen(data);
    console.log("res", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 修改学院信息
  async updateRecruitmen() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log("data", data);
    const res = await service.recruitmen.updateRecruitmen(data);

    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 回显数据
  async echoOneRecruitmenData() {
    const { ctx, service } = this;
    const data = ctx.params;
    console.log(data);
    const res = await service.recruitmen.echoOneRecruitmenData(data);
    console.log("hui res", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  //   查询学院列表数组

  async getFacultyData() {
    const { ctx, service } = this;
    const res = await service.faculty.getFacultyData();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = RecruitmenController;
