import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const AvailableSchema = new Schema(
    {
        vaccine: [
            {
                nine: Array,
                ten: Array,
                eleven: Array,
                twelve: Array,
                thirty: Array,
                fourteen: Array,
                fifteen: Array,
                sixteen: Array,
                seventeen: Array,

            },


        ]/* ,
        clinic: {
            type: ObjectId,
            ref: "Province",
        },
        hospital: {
            type: ObjectId,
            ref: "Province",
        }, */


    },
    { timestamps: true }
);

const Available = mongoose.model("Available", AvailableSchema);

module.exports = Available;