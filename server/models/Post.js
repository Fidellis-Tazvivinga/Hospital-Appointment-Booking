import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
      trim: true,
      index:true
    },

   contentHTML: {
      type: String,
      required: "contentHTML is required",
      trim: true,
    },
    contentMarkdown: {
      type: String,
      required: "contentMarkdown is required",
      trim: true,
    },
    postedBy: {
        type: ObjectId,
        ref: "Doctor",
    },
   
    specialization: {
        type: ObjectId,
        ref: "Specialization",
    },
   
    postedBy: {
        type: ObjectId,
        ref: "Doctor",
    },
   
    image: {
      data: Buffer,
      contentType: String,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);