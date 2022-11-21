const { User } = require("../models/userModel");
const { NotAuthorizedError } = require("../helpers/error");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registration = async ({ email, password, subscription }) => {
  const user = new User({ email, password, subscription });
  await user.save();
  return user;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError(`No user with email: ${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Email or password is wrong");
  }
  const token = jwt.sign(
    { _id: user._id, createdAt: user.createdAt },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return { token, user };
};

const logout = async (id) => {
  const user = await User.findOne({ id });
  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }

  user.token = null;
};

// const current = async (id) => {};

const updateSubscriptionUser = async (userId, subscription) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { subscription },
    { new: true }
  );
};
module.exports = {
  registration,
  login,
  logout,
  //   current,
  updateSubscriptionUser,
};
