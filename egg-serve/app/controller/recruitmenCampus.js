"use strict";

const { Controller } = require("egg");

class RecruitmenCampusController extends Controller {
  // recruitmen
  // 创建一个学院
  async recruitmenCampusCreate() {
    const { ctx, service } = this;
    // ctx.body全称是ctx.response.body返回的数据
    const data = ctx.request.body;
    console.log("data", data);
    const res = await service.recruitmenCampus.recruitmenCampusCreate(data);
    // // console.log("recruitmenCreate", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 查询列表页
  async findAllRecruitmenCampus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log('data',data);
    const res = await service.recruitmenCampus.findAllRecruitmenCampus(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 删除单个学院
  async removeOneRecruitmenCampus() {
    const { ctx, service } = this;
    const data = ctx.params;
    console.log('data',data);
    const res = await service.recruitmenCampus.removeOneRecruitmenCampus(data);
    console.log("res", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 修改学院信息
  async updateRecruitmenCampus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log("data", data);
    const res = await service.recruitmenCampus.updateRecruitmenCampus(data);

    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 回显数据
  async echoOneRecruitmenCampusData() {
    const { ctx, service } = this;
    const data = ctx.params;
    console.log(data);
    const res = await service.recruitmenCampus.echoOneRecruitmenCampusData(data);
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

module.exports = RecruitmenCampusController;
