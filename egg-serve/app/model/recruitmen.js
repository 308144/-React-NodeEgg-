// 院系
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RecruitmenSchema = new Schema(
    {
      enterpriseSize: { type: String, required: true },
      recruitmentSubject: { type: String, required: true },
      releaseDate: { type: String, required: true },
      recruitmentPost: { type: String, required: true },
      Industry: { type: String, required: true },
      placeWork: { type: String, required: true },
      businessMailbox: { type: String, required: true },
      recruiterPhone: { type: String, required: true },
      recruiterPersonCount: { type: String, required: true },
      status: { type: String, required: true },
    },
    // mongdb数据库是对自动创建s的，我们在这里专门设置限制
    { collect: "recruitmen", versionKey: false }
  );
  return mongoose.model("recruitmen", RecruitmenSchema);
};
