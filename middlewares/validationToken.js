const jwt = require("jsonwebtoken");
const {
  RequestError,
  NotAuthorizedError,
  controllerWrapper,
} = require("../helpers");
const { User } = require("../models/userModel");
const { ACCESS_JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw RequestError(401, "Not authorized.Please,provide a token");
  }
  try {
    const { _id } = jwt.verify(token, ACCESS_JWT_SECRET);
    const user = await User.findById(_id);
    if (!user || !user.accessToken) {
      throw new NotAuthorizedError(
        `Not authorized.No user with id: ${_id} found`
      );
    }
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    throw RequestError(401, "Invalid token");
  }
};
module.exports = controllerWrapper(authMiddleware);
