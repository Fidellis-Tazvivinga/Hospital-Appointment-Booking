import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ClinicSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      required: "Name is required",
      trim: true,
      index: true
    },
    clinicPhoneNumber: {
      type: String,
      required: "Number is required",

    },
    clinicAddress: {
      type: String,
    },
    clinicIntroduction: {
      type: String,
      required: "introductionHTML is required",
      trim: true,
    },
    /*   introductionMarkdown: {
        type: String,
        required: "introductionMarkdown is required",
        trim: true,
      }, */
    clinicDesc: {
      type: String,
      required: "description is required",
      trim: true,
    },

    clinicImage: {
      type: 'String',

    },
    clinicProvince: {
      type: ObjectId,
      ref: "Province",
      required: "Province is required",

    },

  },
  { timestamps: true }
);


const Clinic = mongoose.model("Clinic", ClinicSchema);

module.exports = Clinic;