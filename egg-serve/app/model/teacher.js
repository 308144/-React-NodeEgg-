// 院系
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeacherSchema = new Schema(
    {
      teacherName: { type: String, require:true },
      faculty: { type: String, required: true },
      teacherPhone:{type:String,required:true}
    },
    // mongdb数据库是对自动创建s的，我们在这里专门设置限制
    { collect: "teacher", versionKey: false }
  );
  return mongoose.model("teacher", TeacherSchema);
};
