const express = require("express");
const { validateUserId } = require("../middleware/user-middleware");
const Helper = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", async (req, res) => {});

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

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
