import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ProvinceSchema = new Schema(
    {
        name: {
            type: String,
            required: "province is required",
            trim: true,
            index: true
        },
        cities: {
            type: Array,

            trim: true,
            index: true
        },
        district: {
            type: Array,

            trim: true,
            index: true
        }

    },
    { timestamps: true }
);

const Province = mongoose.model("Province", ProvinceSchema);

module.exports = Province;