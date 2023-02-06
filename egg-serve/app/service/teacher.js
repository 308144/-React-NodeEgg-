const Service = require("egg").Service;

class TeacherService extends Service {
  async teacherCreate(body) {
    const { ctx } = this;
    const teacherName = body.teacherName;
    const findData = await ctx.model.Teacher.findOne({
      teacherName: teacherName,
    });
    if (findData) {
      return {
        code: 1,
        data: null,
        msg: "该老师已经存在,请勿重复创建",
      };
    } else {
      await ctx.model.Teacher.create(body);
      return {
        code: 0,
        data: null,
        msg: "创建老师信息成功",
      };
    }
  }
  //   查询所有院系
  async findAllTeacher(params) {
    const { ctx } = this;
    const { current, pageSize } = params;
    delete params.current;
    delete params.pageSize;
    const findAllUser = await ctx.model.Teacher.find({
      ...params,
    })
      .skip((current - 1) * pageSize)
      .limit(pageSize);
    const total = await ctx.model.Teacher.find({
      ...params,
    }).count();
    console.log("findAllUser，total", findAllUser, total);
    if (findAllUser) {
      return {
        msg: "查询用户成功",
        code: 0,
        data: {
          current,
          pageSize,
          total,
          records: [...findAllUser],
        },
      };
    }
  }
  // 删除
  async removeOneTeacher(data) {
    const { id } = data;
    const { ctx } = this;
    console.log(id);
    const res = await ctx.model.Teacher.deleteOne({ _id: id });
    console.log("removeOneTeacher", res);
    if (res.ok === 1) {
      return {
        code: 0,
        data: null,
        msg: "删除成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "删除失败",
      };
    }
  }

  // 回显数据
  async echoOneTeacherData(params) {
    const { ctx } = this;
    const { id } = params;
    const records = await ctx.model.Teacher.find({ _id: id });
    if (records.length) {
      return {
        code: 0,
        data: records,
        msg: "查询成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "查询失败",
      };
    }
  }
 
  // 修改
  async updateTeacher(params) {
    const { ctx } = this;
    const { values, id ,teacherPhone} = params;
    const res = await ctx.model.Teacher.updateOne(
      { _id: id },
      { $set: { ...values } }
    );
    await ctx.model.Information.updateMany(
      { teacherPhone: teacherPhone },
      { $set: { teacher:values.teacherName,teacherPhone:values.teacherPhone,faculty:values.faculty } }
    );
    if (res.ok === 1) {
      return {
        code: 0,
        data: null,
        msg: "修改教师成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "修改教师失败",
      };
    }
  }

  //   查询学院列表数组
  async selectTeacherDatas(faculty) {
    const { ctx } = this;
    const findAllUser = await ctx.model.Teacher.find({faculty});
    if (findAllUser) {
      return {
        msg: "查询教师成功",
        code: 0,
        data: {
          records: [...findAllUser],
        },         
      };
    }
  }
   // 查询教师的手机号
   async getInformationModalTeacherPhoneData(params) {
    const { ctx } = this;
    const { teacherName,
      faculty } = params;
    console.log('teacherName',teacherName);
    const records = await ctx.model.Teacher.find({teacherName,
      faculty });
      console.log('records',records);
    if (records.length) {
      return {
        code: 0,
        data: {
          records: [...records],
        },      
        msg: "查询成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "查询失败",
      };
    }
  }
}
module.exports = TeacherService;
