// 专业
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const SpecializedSchema = new Schema(
      {
        specialized: { type: String, required: true },
        specializedNumber: { type: Number, required: true },
      },
       // mongdb数据库是对自动创建s的，我们在这里专门设置限制
      { collect: "specialized", versionKey: false }
    );
    return mongoose.model("specialized", SpecializedSchema);
  };
  