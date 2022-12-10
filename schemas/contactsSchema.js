const Joi = require("joi");
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegExp = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

const schemaAddContact = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegExp).required(),
  favorite: Joi.boolean(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegExp),
  favorite: Joi.boolean(),
}).min(1);

const schemaReplaceContact = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().pattern(emailRegexp).optional(),
  phone: Joi.string().pattern(phoneRegExp).optional(),
  favorite: Joi.boolean(),
}).min(1);
const schemaUpdateStatusFavoriteContact = Joi.object({
  favorite: Joi.boolean().required(),
}).min(1);

module.exports = {
  schemaAddContact,
  schemaUpdateContact,
  schemaReplaceContact,
  schemaUpdateStatusFavoriteContact,
};
