// 企业
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const EnterpriseSchema = new Schema(
    {
      enterprise: { type: String, required: true },
      enterpriseNumber: { type: Number, required: true },
    },
    // mongdb数据库是对自动创建s的，我们在这里专门设置限制
    { collect: "enterprise", versionKey: false }
  );
  return mongoose.model("enterprise", EnterpriseSchema);
};
