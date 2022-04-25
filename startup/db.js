//const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
    mongoose
        .connect(process.env.MONGO_DB_URL || "mongodb://localhost:27017/nguwalletpns", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "nguwalletpns",
        })
        .then(() => console.log("Connected to MongoDB..."))
        .catch((err) => console.error("Could not connect to MongoDB.." + err));
};
