const express = require("express");
const cors = require("cors");
const app = express().use("*", cors());

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Listening Port ${port}`);
});
