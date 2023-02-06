"use strict";

const { Controller } = require("egg");

class TeacherController extends Controller {
 // 创建一个学院
 async teacherCreate() {
    const { ctx, service } = this;
    // ctx.body全称是ctx.response.body返回的数据
    const data = ctx.request.body;
    console.log('data',data);
    const res = await service.teacher.teacherCreate(data);
    console.log("facultyCreate", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 查询列表页
  async findAllTeacher() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.teacher.findAllTeacher(data);
    ctx.helper.success({   
      ctx,
      res,
    });
  }
  // 删除单个老师
  async removeOneTeacher() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.teacher.removeOneTeacher(data);
    console.log("res", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 修改laoshi信息
  async updateTeacher() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log('data',data);
    const res = await service.teacher.updateTeacher(data);

    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 回显数据
  async echoOneTeacherData() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.teacher.echoOneTeacherData(data);
    console.log("hui res", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 查询教师的手机号
  async getInformationModalTeacherPhoneData() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.teacher.getInformationModalTeacherPhoneData(data);
    console.log("teacher", res);
    ctx.helper.success({
      ctx,
      res,
    });
  }
//   查询学院列表数组

async selectTeacherDatas() {
    const { ctx, service } = this;
    const {faculty}=ctx.params

    const res = await service.teacher.selectTeacherDatas(faculty);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = TeacherController;
