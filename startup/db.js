//const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
    mongoose
        .connect(config.get("db") || "mongodb://localhost:27017/nguwalletpns", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "nguwalletpns",
        })
        .then(() => console.log("Connected to MongoDB..."))
        .catch((err) => console.error("Could not connect to MongoDB.." + err));
};
