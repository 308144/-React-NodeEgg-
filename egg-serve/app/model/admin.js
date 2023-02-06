const helper = require("../extend/helper");
module.exports = (app) => {
  // 从app中引入mongoose
  const mongoose = app.mongoose;
  //从mongoose中引入Scheam
  const Schema = mongoose.Schema;
  // 创建结构
  const AdminSchema = new Schema(
    {
      userName: { type: String, required: true },
      password: { type: String, required: true },
      identity: { type: String },
    },
    // mongdb数据库是对自动创建s的，我们在这里专门设置限制
    { collect: "admin", versionKey: false }
  );
  const AdminModel = mongoose.model("Admin", AdminSchema);

  let adminUser = { userName: "15845500411", password: "dbfront" , identity: 'manager'};
  helper.genSaltPassword(adminUser.password).then(async (hash) => {
    adminUser.password = hash;
    const oldUser = await AdminModel.find({ userName: adminUser.userName });
    if (oldUser.length === 0) {
      AdminModel.create(adminUser);
    }
  });
  return AdminModel;
};
