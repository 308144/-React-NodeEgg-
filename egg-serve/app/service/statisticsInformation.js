const Service = require("egg").Service;

class StatisticsInformationService extends Service {
  // // 创建专业统计
  // async createSpecialized(data) {
  //   const { ctx } = this;
  //   console.log("data", data);
  //   const specialized = data.specialized;
  //   //  console.log(ctx.model.specialized);
  //   const findSpecializedData = await ctx.model.Specialized.findOne({
  //     specialized: specialized,
  //   });
  //   console.log("findSpecializedData", findSpecializedData);
  //   if (findSpecializedData) {
  //     findSpecializedData.specializedNumber++;
  //     await ctx.model.Specialized.updateOne(
  //       { specialized: findSpecializedData.specialized },
  //       {
  //         $set: { ...findSpecializedData },
  //       }
  //     );
  //   } else {
  //     const specializedData = {
  //       specialized: specialized,
  //       specializedNumber: 1,
  //     };
  //     await ctx.model.Specialized.create(specializedData);
  //   }
  // }
  // // 删除专业统计
  // async deleteSpecialized(data) {
  //   const { ctx } = this;
  //   console.log("data", data);
  //   const specialized = data.specialized;
  //   const findSpecializedData = await ctx.model.Specialized.findOne({
  //     specialized: specialized,
  //   });
  //   // console.log("findSpecializedData", findSpecializedData);
  //   if (findSpecializedData) {
  //     findSpecializedData.specializedNumber--;
  //     await ctx.model.Specialized.updateOne(
  //       { specialized: findSpecializedData.specialized },
  //       {
  //         $set: { ...findSpecializedData },
  //       }
  //     );
  //   } else {
  //     throw Error("删除专业统计出错了");
  //   }
  // }
  // // 创建岗位统计
  // async createPost(data) {
  //   const { ctx } = this;
  //   console.log("data", data);
  //   const post = data.employmentPost;
  //   console.log("post", post);
  //   const findPostData = await ctx.model.Post.findOne({
  //     post: post,
  //   });
  //   if (findPostData) {
  //     findPostData.postNumber++;
  //     await ctx.model.Post.updateOne(
  //       { post: findPostData.post },
  //       {
  //         $set: { ...findPostData },
  //       }
  //     );
  //   } else {
  //     const postData = { post: post, postNumber: 1 };
  //     await ctx.model.Post.create(postData);
  //   }
  // }
  // // 删除岗位统计
  // async deletePost(data) {
  //   const { ctx } = this;
  //   console.log("data", data);
  //   const post = data.employmentPost;
  //   console.log("post", post);
  //   const findPostData = await ctx.model.Post.findOne({
  //     post: post,
  //   });
  //   console.log("findPostData", findPostData);
  //   if (findPostData) {
  //     findPostData.postNumber--;
  //     await ctx.model.Post.updateOne(
  //       { post: findPostData.post },
  //       {
  //         $set: { ...findPostData },
  //       }
  //     );
  //   } else {
  //     throw Error("删除岗位统计出错了");
  //   }
  // }
  // // 创建企业统计
  // async createEnterprise(data) {
  //   const { ctx } = this;
  //   console.log("data", data);
  //   const enterprise = data.employmentUnits;
  //   const findEnterpriseData = await ctx.model.Enterprise.findOne({
  //     enterprise: enterprise,
  //   });
  //   if (findEnterpriseData) {
  //     findEnterpriseData.enterpriseNumber++;
  //     await ctx.model.Enterprise.updateOne(
  //       { enterprise: findEnterpriseData.enterprise },
  //       {
  //         $set: { ...findEnterpriseData },
  //       }
  //     );
  //   } else {
  //     const enterpriseData = {
  //       enterprise: enterprise,
  //       enterpriseNumber: 1,
  //     };
  //     await ctx.model.Enterprise.create(enterpriseData);
  //   }
  // }
  // // 删除企业统计
  // async deleteEnterprise(data) {
  //   const { ctx } = this;
  //   console.log("data", data);
  //   const enterprise = data.employmentUnits;
  //   const findEnterpriseData = await ctx.model.Enterprise.findOne({
  //     enterprise: enterprise,
  //   });
  //   if (findEnterpriseData) {
  //     findEnterpriseData.enterpriseNumber--;
  //     await ctx.model.Enterprise.updateOne(
  //       { enterprise: findEnterpriseData.enterprise },
  //       {
  //         $set: { ...findEnterpriseData },
  //       }
  //     );
  //   } else {
  //     throw Error("删除企业统计出错了");
  //   }
  // }
  // 按专业统计、按岗位统计、按企业统计
  async findAll(params) {
    const { ctx } = this;
    console.log("就业统计的", params);
    if (params.currencyType === "1") {
      // const SpecializedData = await ctx.model.Specialized.find({});
      const SpecializedData = await ctx.model.Information.aggregate([
        { $group: { _id: "$specialized", specializedNumber: { $sum: 1 } } },
      ]);
      console.log("SpecializedData", SpecializedData);

      if (SpecializedData) {
        return {
          code: 0,
          data: SpecializedData,
          msg: "查询成功按专业统计信息",
        };
      }
    } else if (params.currencyType === "2") {
      // const PostData = await ctx.model.Post.find({});
      const PostData = await ctx.model.Information.aggregate([
        { $group: { _id: "$employmentPost", postNumber: { $sum: 1 } } },
      ]);
      console.log("PostData", PostData);

      if (PostData) {
        return {
          code: 0,
          data: PostData,
          msg: "查询成功按岗位统计信息",
        };
      }
    } else {
      // const EnterpriseData = await ctx.model.Enterprise.find({});
      const EnterpriseData = await ctx.model.Information.aggregate([
        { $group: { _id: "$employmentUnits", enterpriseNumber: { $sum: 1 } } },
      ]);
      console.log("EnterpriseData", EnterpriseData);

      if (EnterpriseData.length) {
        return {
          code: 0,
          data: EnterpriseData,
          msg: "查询成功按企业统计信息",
        };
      }
    }
  }
  // 用户统计中的查看详情
  async findDetailData(dataParams) {
    const { ctx } = this;
    const { params, data } = dataParams;
    const { current, pageSize } = params;
    const { currentTypeState, detailData } = data;
    delete params.current;
    delete params.pageSize;
    console.log("currentTypeState,detailData", currentTypeState, detailData);
    if (currentTypeState === "1") {
      const findData = await ctx.model.Information.find({
        specialized: detailData,
        ...params,
      })
        .skip((current - 1) * pageSize)
        .limit(pageSize);
      const total = await ctx.model.Information.find({
        specialized: detailData,
        ...params,
      }).count();

      return {
        msg: "成功",
        code: 0,
        data: {
          current,
          size: pageSize,
          total,
          records: [...findData],
        },
      };
    } else if (currentTypeState === "2") {
      const findPostData = await ctx.model.Information.find({
        employmentPost: detailData,
        ...params,
      })
        .skip((current - 1) * pageSize)
        .limit(pageSize);
      const postTotal = await ctx.model.Information.find({
        post: detailData,
      }).count();
      console.log("findPostData", findPostData);
      return {
        msg: "成功",
        code: 0,
        data: {
          current,
          size: pageSize,
          total: postTotal,
          records: [...findPostData],
        },
      };
    } else {
      const findEnterpriseData = await ctx.model.Information.find({
        employmentUnits: detailData,
        ...params,
      })
        .skip((current - 1) * pageSize)
        .limit(pageSize);
      const enterpriseTotal = await ctx.model.Information.find({
        enterprise: detailData,
        ...params,
      }).count();
      return {
        msg: "成功",
        code: 0,
        data: {
          current,
          size: pageSize,
          total: enterpriseTotal,
          records: [...findEnterpriseData],
        },
      };
    }
  }
}
module.exports = StatisticsInformationService;
