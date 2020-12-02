const Helper = require("../users/userDb");

const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Helper.getById(id);
    if (!user) {
      res.status(400).json({ message: "invalid user id" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the user",
    });
  }
};

const validateUser = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
};

module.exports = {
  validateUserId,
  validateUser,
};
