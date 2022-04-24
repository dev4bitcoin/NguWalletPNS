const express = require("express");
const error = require("../middleware/error");
const subscriptions = require("../routes/subscriptions");

module.exports = function (app) {
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));
    app.use("/api/", subscriptions);
    app.use(error);
};
