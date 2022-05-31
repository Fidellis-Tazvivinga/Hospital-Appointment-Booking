const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerServiceSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 2,
    },

    hospital: {
      type: String,
      ref: "Hospital",
    },
    clinic: {
      type: String,
      ref: "Clinic",
    },
    specialization: {
      type: String,
      ref: "Specialization",
    },
    phoneNumber: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const CustomerService = mongoose.model("CustomerService", customerServiceSchema);

module.exports = CustomerService;