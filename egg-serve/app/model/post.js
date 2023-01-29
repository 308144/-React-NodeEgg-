// 岗位
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const PostSchema = new Schema(
      {
        post: { type: String, required: true },
        postNumber: { type: Number, required: true },
      },
       // mongdb数据库是对自动创建s的，我们在这里专门设置限制
      { collect: "post", versionKey: false }
    );
    return mongoose.model("post", PostSchema);
  };
  