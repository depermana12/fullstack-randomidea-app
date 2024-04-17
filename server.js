const express = require("express");
const app = express();
const port = 5000;

const ideas = [
  {
    id: 1,
    text: "Positive newsletter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "TonyStark",
    date: "12-04-2024",
  },
  {
    id: 2,
    text: "Milk cartons that turn a different color the older that your milk is getting",
    tag: "Inventions",
    username: "BruceBanner",
    date: "10-04-2024",
  },
  {
    id: 3,
    text: "ATM location app which lets you know where the closest ATM is and if it is in service",
    tag: "Software",
    username: "SteveRoger",
    date: "02-04-2024",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to the random ideas homepage");
});

// get all ideas
app.get("/api/posts", (req, res) => {
  res.send({ success: true, data: ideas });
});

// get specific idea from an id
app.get("/api/posts/:id", (req, res) => {
  // to get the id, use query params, start with colon:
  // the way to access is to used requst object req.params.id
  const idea = ideas.find((idea) => idea.id == +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  res.json({ success: true, data: idea });
});

app.listen(port, () => {
  console.log(`Running server listening on port${port}`);
});
