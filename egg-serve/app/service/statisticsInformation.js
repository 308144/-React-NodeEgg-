const Service = require("egg").Service;

class StatisticsInformationService extends Service {

  async findAll(params) {
    const { ctx } = this;
    console.log('就业统计的',params);
    // const { current, size } = params;
    // delete params.current;
    // delete params.size;
    // // console.log({...params});
    // const findData = await ctx.model.Information.find({
    //   ...params,
    // })
    //   .skip((current - 1) * size)
    //   .limit(size);
    // const total = await ctx.model.Information.find({
    //   ...params,
    // })
    //   .skip((current - 1) * size)
    //   .limit(size)
    //   .count();

    // const beforPages =
    //   await ctx.model.Information.find({
    //     ...params,
    //   }.count()) / size;
    // return {
    //   msg: "成功",
    //   code: 0,
    //   data: {
    //     current,
    //     size,
    //     total,
    //     pages: beforPages < 1 ? 1 : beforPages,
    //     records: [...findData],
    //   },
    // };
  }

  // 删除
  async deleteOneInformation(data) {
    const {phone}=data
    const { ctx } = this;
    const res = await ctx.model.Information.deleteOne({ phone: phone });
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
  // 修改
  async updateOneInformation(params) {
    const { ctx } = this;
    console.log(params);
    const { idPhone } = params;
    delete params.idPhone;
    const res = await ctx.model.Information.updateOne(
      { phone: idPhone },
      { $set: { ...params } }
    );
    if (res.ok === 1) { 
      return {
        code: 0,
        data: null,
        msg: "修改学员成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "修改学员失败",
      };
    }
  }
  // 回显数据
  async echoOneInformationData(phone) {
    const { ctx } = this;
    const records = await ctx.model.Information.find({ phone: phone });
    if (records.length) {
      return {
        code: 0,
        data: { records },
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
module.exports = StatisticsInformationService;
