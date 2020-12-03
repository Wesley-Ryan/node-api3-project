const express = require("express");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/user-middleware");
const Helper = require("./userDb");
const PostHelper = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, async (req, res) => {
  const user = req.body;
  try {
    await Helper.insert(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const post = PostHelper.insert(post);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Helper.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  const { id } = req.params;
  try {
    const userPosts = await Helper.getUserPosts(id);
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    const removed = await Helper.remove(req.user);
    res.status(201).status.json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", validateUserId, async (req, res) => {});

//custom middlewar

module.exports = router;
