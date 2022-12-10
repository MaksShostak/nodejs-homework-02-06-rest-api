const Joi = require("joi");
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^[a-zA-Z0-9]{3,30}$/;
const subscriptionList = ["starter", "pro", "business"];

const schemaRegisterUser = Joi.object({
  password: Joi.string().pattern(passwordRegexp).min(6).max(14).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...subscriptionList),
  token: [Joi.string(), Joi.number()],
});

const schemaLoginUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).min(6).max(14).required(),
});
module.exports = { schemaRegisterUser, schemaLoginUser };
