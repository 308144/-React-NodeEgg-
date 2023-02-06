const Service = require("egg").Service;

class FacultyService extends Service {
  async facultyCreate(body) {
    const { ctx } = this;
    const faculty = body.faculty;
    // const findData = await ctx.model.Faculty.findOne({
    //   faculty: faculty,
    // });
    // console.log("findData", findData);
    if (findData) {
      return {
        code: 1,
        data: null,
        msg: "该学院已经存在,请勿重复创建",
      };
    } else {
      await ctx.model.Faculty.create(body);
      return {
        code: 0,
        data: null,
        msg: "创建学院成功",
      };
    }
  }
  //   查询所有院系
  async findAllFaculty(params) {
    const { ctx } = this;
    const { current, pageSize } = params;
    delete params.current;
    delete params.pageSize;
    const findAllUser = await ctx.model.Faculty.find({
      ...params,
    })
      .skip((current - 1) * pageSize)
      .limit(pageSize);
    const total = await ctx.model.Faculty.find({
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
  async removeOneFaculty(data) {
    const { id } = data;
    const { ctx } = this;
    const res = await ctx.model.Faculty.deleteOne({ _id: id });
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
  async echoOneFacultyData(params) {
    const { ctx } = this;
    const { id } = params;
    const records = await ctx.model.Faculty.find({ _id: id });
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
  async updateFaculty(params) {
    console.log('params',params);
    const { ctx } = this;
    const { values, id ,original} = params;
    const findRes = await ctx.model.Faculty.find({ faculty: values.faculty });
    console.log('findRes',findRes);
    if (findRes.length!==0) {
      return {
        code: 1,
        data: null,
        msg: "此学员已经存在，请勿重复",
      };
    } else {
      const res = await ctx.model.Faculty.updateOne(
        { _id: id },
        { $set: { ...values } }
      );
      if (res.ok === 1) {
     await ctx.model.Teacher.updateMany(
          { faculty: original },
          { $set: { ...values } }
        );
     await ctx.model.Information.updateMany(
          { faculty: original },
          { $set: { ...values } }
        );
        // console.log('teaRes',teaRes);
        return {
          code: 0,
          data: null,
          msg: "修改学院成功",
        };
      } else {
        return {
          code: 1,
          data: null,
          msg: "修改学院失败",
        };
      }
    }
  }

  //   查询学院列表数组
  async getFacultyData() {
    const { ctx } = this;

    const findAllUser = await ctx.model.Faculty.find({});

    const total = await ctx.model.Faculty.find({}).count();
    console.log("findAllUser，total", findAllUser, total);
    if (findAllUser) {
      return {
        msg: "查询用户成功",
        code: 0,
        data: {
          total,
          records: [...findAllUser],
        },
      };
    }
  }
}
module.exports = FacultyService;
