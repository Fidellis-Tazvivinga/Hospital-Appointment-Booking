const mongoose = require("mongoose");

const connectDB = async () => { try { await mongoose.connect(`${process.env.DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true, }); console.log("Database connection sucess"); } catch (error) { console.log(error); } };

module.exports = connectDB;