const Service = require("egg").Service;

class RecruitmenCampusService extends Service {
  async recruitmenCampusCreate(body) {
    const { ctx } = this;
    const findData = await ctx.model.RecruitmenCampus.create({
      ...body,
    });
    console.log("findData", findData);
    return {
      code: 0,
      data: null,
      msg: "创建招聘宣讲会成功",
    };
  }
  //   查询所有院系
  async findAllRecruitmenCampus(params) {
    const { ctx } = this;
    const { current, pageSize } = params;
    delete params.current;
    delete params.pageSize;
    const findAllRecruitmens = await ctx.model.RecruitmenCampus.find({
      ...params,
    })
      .skip((current - 1) * pageSize)
      .limit(pageSize);
    const total = await ctx.model.RecruitmenCampus.find({
      ...params,
    }).count();
    return {
      msg: "查询招聘宣讲会成功",
      code: 0,
      data: {
        current,
        pageSize,
        total,
        records: [...findAllRecruitmens],
      },
    };
  }
  // 删除
  async removeOneRecruitmenCampus(data) {
    const { id } = data;
    const { ctx } = this;
    const res = await ctx.model.RecruitmenCampus.deleteOne({ _id: id });
    if (res.ok === 1) {
      return {
        code: 0,
        data: null,
        msg: "删除招聘宣讲会成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "删除招聘宣讲会失败",
      };
    }
  }

  // 回显数据
  async echoOneRecruitmenCampusData(params) {
    const { ctx } = this;
    const { id } = params;
    console.log("id", params);
    const records = await ctx.model.RecruitmenCampus.find({ _id: id });
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
  async updateRecruitmenCampus(params) {
    console.log("params", params);
    const { ctx } = this;
    const { values, id } = params;

    const res = await ctx.model.RecruitmenCampus.updateOne(
      { _id: id },
      { $set: { ...values } }
    );
    if (res.ok === 1) {
      return {
        code: 0,
        data: null,
        msg: "修改招聘宣讲会成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "修改招聘宣讲会失败",
      };
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
module.exports = RecruitmenCampusService;
