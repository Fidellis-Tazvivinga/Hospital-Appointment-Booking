import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const CitySchema = new Schema(
    {
        name: {
            type: String,
            required: "City is required",
            trim: true,
            index: true
        },
        province: {
            type: ObjectId,
            ref: "Province",
        },


    },
    { timestamps: true }
);

const City = mongoose.model("City", CitySchema);

module.exports = City;