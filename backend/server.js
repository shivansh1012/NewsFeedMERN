const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//logging middleware
let requestLogger = (req, res, next) => { 
    let method = req.method;
    let url = req.url;
    
    let log = `${method}:${url}`;
    console.log(log);
    next();
};
app.use(requestLogger);

//cors
app.use(cors({
    origin: true,
    credentials: true,
}));

//Links
app.use(`/api/news`, require("./News/news.router.js"));
app.use(`/api/author`, require("./Author/author.router.js"));

app.use("*", (req, res) => res.status(404).json({ message: "Invalid Link" }));

module.exports = app;