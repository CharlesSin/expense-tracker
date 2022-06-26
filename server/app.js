const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const indexRouter = require("./routes/route");

// mongodb connection
const mongodbConnection = require("./db/connection.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8080"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// using routes
app.use("/", indexRouter);

mongodbConnection
  .then((db) => {
    if (!db) return process.exit(1);

    console.log(`Mongo DB Connected`);
  })
  .catch((error) => {
    console.log(`Connection Failed...! ${error}`);
  });

module.exports = app;
