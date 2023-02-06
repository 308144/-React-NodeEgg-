"use strict";

const { Controller } = require("egg");

class FacultyController extends Controller {
 // 创建一个学院
 async facultyCreate() {
    const { ctx, service } = this;
    // ctx.body全称是ctx.response.body返回的数据
    const data = ctx.request.body;
    console.log('data',data);
    const res = await service.faculty.facultyCreate(data);
    console.log("facultyCreate", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  
  // 查询列表页
  async findAllFaculty() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.faculty.findAllFaculty(data);
    ctx.helper.success({   
      ctx,
      res,
    });
  }

  
  // 删除单个学院
  async removeOneFaculty() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.faculty.removeOneFaculty(data);
    console.log("res", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 修改学院信息
  async updateFaculty() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log('data',data);
    const res = await service.faculty.updateFaculty(data);

    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 回显数据
  async echoOneFacultyData() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.faculty.echoOneFacultyData(data);
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

module.exports = FacultyController;
