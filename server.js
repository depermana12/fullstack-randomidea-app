const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT;
require("dotenv").config();

connectDB();

// we need to accept a raw data json
// using bodyparser middleware, parsing data in the body
// allow us to send raw json to the server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to the random ideas homepage");
});

const ideasRouter = require("./routes/ideas");

// middleware is something that happen between request and response
app.use("/api/posts", ideasRouter);

app.listen(port, () => {
  console.log(`Running server listening on port: ${process.env.PORT}`);
});
