const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// get all ideas
router.get("/", async (req, res) => {
  // when we use an models, in this case idea which is our models
  // using idea.find to get the record of documents in the database. That is asynchronous that return promise
  // so we gonna use async await

  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "No resource found" });
  }
});

// get single specific idea from an id
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    res.status(404).json({ success: false, error: "Resource not found" });
  }
});

// add middleware to say that if we go to an api/ideas. then we want to look at that folder files
// by adding middleware is on the request object, when we get the request then we can access req.body.field

// Add and idea
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  try {
    // we gonna use the save method
    const saveIdea = await idea.save();
    res.json({ success: true, data: saveIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server went wrong" });
  }
});

// update post
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        {
          // if the id doesn't exists, then make new of the idea
          new: true,
        }
      );
      return res.json({ success: true, data: updatedIdea });
    }

    // username do not match
    res
      .status(403)
      .json({
        success: false,
        error: "Forbiden, you are not authorize to edit this",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server went wrong" });
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // match the username to validate
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // username do not match
    res
      .status(403)
      .json({
        success: false,
        error: "Forbiden, you are not authorize to delete this",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server went wrong" });
  }
});

module.exports = router;
