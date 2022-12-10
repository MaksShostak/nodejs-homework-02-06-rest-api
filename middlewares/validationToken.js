const jwt = require("jsonwebtoken");
const {
  handleRequestError,
  NotAuthorizedError,
  controllerWrapper,
} = require("../helpers");
const { User } = require("../models/userModel");
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    //  next(new NotAuthorizedError("Not authorized.Please,provide a token"));
    throw handleRequestError(401, "Not authorized.Please,provide a token");
  }
  try {
    const { _id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(_id);
    if (!user || !user.token) {
      throw new NotAuthorizedError(
        `Not authorized.No user with id: ${_id} found`
      );
    }
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    // next(new NotAuthorizedError("Invalid token"));
    throw handleRequestError(401, "Invalid token");
  }
};
module.exports = controllerWrapper(authMiddleware);
