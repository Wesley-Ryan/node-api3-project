const express = require("express");
const { validatePost } = require("../middleware/user-middleware");
const Helper = require("./postDb");
const router = express.Router();

function validatePostId(req, res, next) {
  const { id } = req.params;
  try {
    const post = Helper.getById(id);
    if (!post) {
      res.status(400).json({ message: "invalid post id" });
    } else {
      req.post = post;
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the post",
    });
  }
}

router.get("/", async (req, res) => {
  try {
    const posts = Helper.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  try {
    const deletedPost = Helper.remove(req.post);
    res.status(201).json(deletedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", validatePostId, validatePost, async (req, res) => {
  const changes = req.body;

  try {
    const updatedPost = await Helper.update(req.post, changes);
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// custom middleware

module.exports = router;
