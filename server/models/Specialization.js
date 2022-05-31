import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const SpecializationSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
      index: true
    }


  },
  { timestamps: true }
);


const Specialization = mongoose.model("Specialization", SpecializationSchema);

module.exports = Specialization;