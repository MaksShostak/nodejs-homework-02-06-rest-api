const { User } = require("../models/userModel");
const { REFRESH_JWT_SECRET } = process.env;

const {
  RequestError,
  sendMail,
  createVerifyEmail,
  createTokens,
} = require("../helpers");
const gravatar = require("gravatar");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const registration = async ({ email, password, subscription }) => {
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw RequestError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email, { s: "250", r: "x", d: "retro" }, true);
  const hashPassword = await bcrypt.hash(password, 8);
  const verificationToken = nanoid();

  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const verifyMail = createVerifyEmail(email, verificationToken);

  await sendMail(verifyMail);
  return newUser;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password invalid");
  }
  if (!user.verify) {
    throw RequestError(401, "Email not varify ");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password invalid");
  }
  const payload = {
    _id: user._id,
  };
  const { refreshToken, accessToken } = createTokens(payload);
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  return { accessToken, refreshToken, user };
};

const refresh = async (refreshToken) => {
  try {
    const { _id } = jwt.verify(refreshToken, REFRESH_JWT_SECRET);
    const payload = {
      _id,
    };
    const tokens = createTokens(payload);
    await User.findByIdAndUpdate(_id, { ...tokens });
    return tokens;
  } catch (error) {
    throw RequestError(403, error.message);
  }
};

const logout = async (id) => {
  return await User.findByIdAndUpdate(id, {
    refreshToken: "",
    accessToken: "",
  });
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

const verify = async (varificationToken) => {
  const user = await User.findOne({ varificationToken });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    varificationToken: "",
    verify: true,
  });
};

const reverify = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.verify) {
    throw RequestError(404, "Verification has already been passed");
  }
  const verifyMail = createVerifyEmail(email, user.verificationToken);
  await sendMail(verifyMail);
};

module.exports = {
  registration,
  login,
  logout,
  updateSubscriptionUser,
  changeAvatar,
  verify,
  reverify,
  refresh,
};
