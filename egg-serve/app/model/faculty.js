// 院系
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const FacultySchema = new Schema(
    {
      faculty: { type: String, required: true },
    },
    // mongdb数据库是对自动创建s的，我们在这里专门设置限制
    { collect: "faculty", versionKey: false }
  );
  return mongoose.model("faculty", FacultySchema);
};
