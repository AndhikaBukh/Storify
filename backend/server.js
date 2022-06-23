require("dotenv").config();
const express = require("express");

const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
})