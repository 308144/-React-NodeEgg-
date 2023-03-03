// 院系
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RecruitmenCampusSchema = new Schema(
    {
      preachTheme: { type: String, required: true },
      preachEnterprise: { type: String, required: true },
      preachPost: { type: String, required: true },
      preachSize: { type: String, required: true },
      preachIndustry: { type: String, required: true },
      preachStatus: { type: String, required: true },
    },
    // mongdb数据库是对自动创建s的，我们在这里专门设置限制
    { collect: "recruitmencampus", versionKey: false }
  );
  return mongoose.model("recruitmenCampus", RecruitmenCampusSchema);
};
