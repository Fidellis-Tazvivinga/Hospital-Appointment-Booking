import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const HospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: "Name is required",
      trim: true,
      index: true
    },
    hospitalPhoneNumber: {
      type: String,
      required: "Number is required",

    },
    hospitalAddress: {
      type: String,
    },
    hospitalIntroduction: {
      type: String,
      required: "introductionHTML is required",
      trim: true,
    },

    hospitalDesc: {
      type: String,
      required: "description is required",
      trim: true,
    },

    hospitalImage: {
      type: 'String',

    },
    hospitalProvince: {
      type: ObjectId,
      ref: "Province",
      required: "Province is required",

    },
    vaccineFreeSpots: {
      type: ObjectId,
      ref: "Vaccine",

    }


  },
  { timestamps: true }
);


const Hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = Hospital;