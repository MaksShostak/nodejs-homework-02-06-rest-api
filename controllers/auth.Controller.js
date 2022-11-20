const {
  registration,
  login,
  logout,
  // current,
  updateSubscriptionUser,
} = require("../services/authService");

const { User } = require("../models/userModel");

const registrationController = async (req, res) => {
  try {
    const { email, password, subscription = "starter" } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(409)
        .json({ message: "Email in use", status: "Conflict", code: 409 });
    }
    const user = await registration({ email, password, subscription });
    res.status(201).json({
      message: "Created",
      status: "success",
      code: 201,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: error.message,
      code: 400,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { token, user } = await login(req.body);
    res.status(200).json({
      token,
      status: "success",
      code: 200,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: error.message,
      code: 400,
    });
  }
};
const logoutController = async (req, res) => {
  const { _id } = req.user;
  try {
    await logout(_id);
    res.status(204).json({
      status: "success",
      message: "No Content",
      code: 204,
    });
  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: error.message,
      code: 400,
    });
  }
};

const currentController = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: error.message,
      code: 400,
    });
  }
};
const updateSubscriptionController = async (req, res, next) => {
  const userSubscription = ["starter", "pro", "business"];
  const { _id: userId } = req.user;
  const { subscription } = req.body;
  const keys = Object.keys(req.body);
  try {
    if (!keys.includes("subscription")) {
      return res.status(400).json({
        status: "Not found",
        message: "missing field subscription ",
        code: 400,
      });
    }
    if (!userSubscription.includes(subscription)) {
      return res.status(400).json({
        status: "Bad request",
        message: `User can have only one of the following three subscriptions: ${userSubscription} .Please select a subscription name `,
        code: 400,
      });
    }
    const result = await updateSubscriptionUser(userId, subscription);
    if (!result) {
      return res.status(404).json({
        status: "Not found",
        message: `failure, user with id: ${userId} not found!`,
        code: 404,
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { subscription },
    });
  } catch (error) {
    console.error(error);
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
};
