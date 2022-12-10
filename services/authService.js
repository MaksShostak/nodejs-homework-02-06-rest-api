const { User } = require("../models/userModel");
const { RequestError } = require("../helpers");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const registration = async ({ email, password, subscription }) => {
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw RequestError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email, { s: "250", r: "x", d: "retro" }, true);
  const hashPassword = await bcrypt.hash(password, 8);
  return await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    // throw new NotAuthorizedError(`No user with email: ${email} found`);
    throw RequestError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    // throw new NotAuthorizedError("Email or password is wrong");
    throw RequestError(401, "Email or password invalid");
  }
  const payload = {
    _id: user._id,
    createdAt: user.createdAt,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  return { token, user };
};

const logout = async (id) => {
  return await User.findByIdAndUpdate(id, { token: "" });
};

const updateSubscriptionUser = async (userId, subscription) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { subscription },
    { new: true }
  );
};

const changeAvatar = async (userId, tmpDir, originalname) => {
  const [extention] = originalname.split(".").reverse();
  const newAvatar = `${userId}.${extention}`;
  const resizeImg = await Jimp.read(tmpDir);
  resizeImg.resize(250, 250);
  await resizeImg.writeAsync(tmpDir);

  const uploadDir = path.join(avatarsDir, newAvatar);
  await fs.rename(tmpDir, uploadDir);

  const avatarURL = path.join("avatars", newAvatar);
  return await User.findByIdAndUpdate(userId, { avatarURL });
};

module.exports = {
  registration,
  login,
  logout,
  updateSubscriptionUser,
  changeAvatar,
};
