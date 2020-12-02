const express = require("express");
const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());

server.use("/api/users", userRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log("Logger:", req.method, req.url, Date());
  next();
}

module.exports = server;
