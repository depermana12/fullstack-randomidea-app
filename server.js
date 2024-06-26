const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

connectDB();

// static folder
app.use(express.static(path.join(__dirname, "public")));

// we need to accept a raw data json
// using bodyparser middleware, parsing data in the body
// allow us to send raw json to the server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the random ideas homepage");
});

const ideasRouter = require("./routes/ideas");

// middleware is something that happen between request and response
app.use("/api/posts", ideasRouter);

app.listen(port, () => {
  console.log(`Running server listening on port: ${process.env.PORT}`);
});
