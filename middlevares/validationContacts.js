const Joi = require("joi");

const validationSchemaAddContact = (req, res, next) => {
  const schemaAddContact = Joi.object({
    name: Joi.string().alphanum().min(2).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().alphanum().min(2).required(),
    favorite: Joi.boolean(),
  });

  const validationResult = schemaAddContact.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      status: validationResult.error.details[0].message,
      message: "Bad Request, missing required name field",
    });
  }
  next();
};

const validationSchemaUpdateContact = (req, res, next) => {
  const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(2),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().alphanum().min(2),
    favorite: Joi.boolean(),
  }).min(1);

  const validationResult = schemaUpdateContact.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      status: validationResult.error.details[0].message,
      message: " Bad Request, missing fields",
    });
  }
  next();
};
const validationReplaceUpdateContact = (req, res, next) => {
  const schemaReplaceContact = Joi.object({
    name: Joi.string().alphanum().min(2).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    phone: Joi.string().alphanum().min(2).optional(),
    favorite: Joi.boolean(),
  }).min(1);

  const validationResult = schemaReplaceContact.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      status: validationResult.error.details[0].message,
      message: "Bad Request, missing fields",
    });
  }
  next();
};

module.exports = {
  validationSchemaAddContact,
  validationSchemaUpdateContact,
  validationReplaceUpdateContact,
};
