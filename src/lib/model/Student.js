import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    age: Number,
    class: String,
    grade: String,
    image: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
