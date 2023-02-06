module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const InformationSchema = new Schema(
    {
      name: { type: String, required: true },
      class: { type: String, required: true },
      specialized: { type: String, required: true },
      sex: { type: Number, required: true },
      phone: { type: String, required: true },
      employmentTimer: { type: String, required: true },
      employmentPost: { type: String, required: true },
      employmentUnits: { type: String, required: true },
      employmentUnitsAddress: { type: String, required: true },
      treatment: { type: String, required: true },
      // competencyRequirements: { type: String, required: true },
      faculty: { type: String, required: true },
      teacher: { type: String, required: true },
      teacherPhone: { type: String, required: true },
    },
     // mongdb数据库是对自动创建s的，我们在这里专门设置限制
    { collect: "information", versionKey: false }
  );
  return mongoose.model("information", InformationSchema);
};
