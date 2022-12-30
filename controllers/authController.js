const { RequestError } = require("../helpers");

const {
  registration,
  login,
  logout,
  updateSubscriptionUser,
  changeAvatar,
  verify,
  reverify,
  refresh,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;

  const newUser = await registration({
    email,
    password,
    subscription,
  });

  res.status(201).json({
    message: "Created",
    status: "success",
    code: 201,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatar: newUser.avatarURL,
    },
  });
};
const loginController = async (req, res) => {
  const { accessToken, refreshToken, user } = await login(req.body);
  res.status(200).json({
    accessToken,
    refreshToken,
    status: "success",
    code: 200,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
const refreshController = async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await refresh(refreshToken);
  res.status(200).json({
    ...tokens,
    status: "success",
    code: 200,
    message: "OK",
  });
};
const logoutController = async (req, res) => {
  const { _id } = req.user;

  await logout(_id);
  res.status(204).json({
    status: "success",
    message: "logout success",
    code: 204,
  });
};

const currentController = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    message: "OK",
    status: "success",
    code: 200,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateSubscriptionController = async (req, res) => {
  const userSubscription = ["starter", "pro", "business"];
  const { _id: userId } = req.user;
  const { subscription } = req.body;
  const keys = Object.keys(req.body);

  if (!keys.includes("subscription")) {
    return res.status(400).json({
      status: "Not found",
      message: "missing field subscription ",
      code: 400,
    });
  }
  if (!userSubscription.includes(subscription)) {
    throw RequestError(
      400,
      `User can have only one of the following three subscriptions: ${userSubscription} .Please select a subscription name `
    );
  }
  const result = await updateSubscriptionUser(userId, subscription);
  if (!result) {
    throw RequestError(404, `failure, user with id: ${userId} not found!`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    subscription,
  });
};

const avatarController = async (req, res) => {
  const { _id: userId } = req.user;
  const { path: tmpDir, originalname } = req.file;

  const { avatarURL } = await changeAvatar(userId, tmpDir, originalname);

  res.status(200).json({
    status: "success",
    code: 200,
    avatarURL,
  });
};

const verificationController = async (req, res) => {
  const { varificationToken } = req.params;
  await verify(varificationToken);
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

const reverificationController = async (req, res) => {
  const { email } = req.body;
  await reverify(email);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  avatarController,
  verificationController,
  reverificationController,
  refreshController,
};
