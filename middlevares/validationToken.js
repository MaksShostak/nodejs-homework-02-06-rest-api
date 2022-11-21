const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/error");
const { User } = require("../models/userModel");
const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    if (!token) {
      next(new NotAuthorizedError("Not authorized.Please,provide a token"));
    }

    const { _id } = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id });
    if (!user) {
      throw new NotAuthorizedError(
        `Not authorized.No user with id: ${_id} found`
      );
    }
    req.user = user;

    next();
  } catch (error) {
    next(new NotAuthorizedError("Invalid token"));
  }
};
module.exports = { authMiddleware };
