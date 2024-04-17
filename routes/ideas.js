const express = require("express");
const router = express.Router();

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

// get all ideas
router.get("/", (req, res) => {
  res.send({ success: true, data: ideas });
});

// get single specific idea from an id
router.get("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id == +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  res.json({ success: true, data: idea });
});

module.exports = router;
