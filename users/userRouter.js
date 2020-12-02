const express = require("express");
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

router.get("/:id", (req, res) => {
  // do your magic!
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

function validateUserId(req, res, next) {
  const { id } = req.params;
  Helper.getById(id);
  if (!id) {
    res.status(400).json({ message: "invalid user id" });
  } else {
    next();
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
