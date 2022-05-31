import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
      index:true
    }
   
   
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);