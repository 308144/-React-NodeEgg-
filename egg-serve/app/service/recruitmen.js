const Service = require("egg").Service;
const moment = require("moment");

class RecruitmenService extends Service {
  async recruitmenCreate(body) {
    const { ctx } = this;
    body.releaseDate = moment().format("YYYY年MM月DD日");
    const findData = await ctx.model.Recruitmen.create({
      ...body,
    });
    console.log("findData", findData);
    return {
      code: 0,
      data: null,
      msg: "创建招聘信息成功",
    };
  }
  //   查询所有院系
  async findAllRecruitmen(params) {
    const { ctx } = this;
    const { current, pageSize } = params;
    delete params.current;
    delete params.pageSize;
    const findAllRecruitmens = await ctx.model.Recruitmen.find({
      ...params,
    })
      .skip((current - 1) * pageSize)
      .limit(pageSize);
    const total = await ctx.model.Recruitmen.find({
      ...params,
    }).count();
    // console.log("findAllUser，total", findAllUser, total);
    return {
      msg: "查询招聘信息成功",
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
  async removeOneRecruitmen(data) {
    const { id } = data;
    const { ctx } = this;
    const res = await ctx.model.Recruitmen.deleteOne({ _id: id });
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
  async echoOneRecruitmenData(params) {
    const { ctx } = this;
    const { id } = params;
    console.log("id", params);
    const records = await ctx.model.Recruitmen.find({ _id: id });
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
  async updateRecruitmen(params) {
    console.log("params", params);
    const { ctx } = this;
    const { values, id } = params;

    const res = await ctx.model.Recruitmen.updateOne(
      { _id: id },
      { $set: { ...values } }
    );
    if (res.ok === 1) {
      return {
        code: 0,
        data: null,
        msg: "修改招聘信息成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "修改招聘信息失败",
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
module.exports = RecruitmenService;
