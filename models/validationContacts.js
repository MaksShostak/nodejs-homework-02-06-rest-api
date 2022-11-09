const Joi = require("joi");

const validationSchemaAddContact = (body) => {
  const schemaAddContact = Joi.object({
    name: Joi.string().alphanum().min(2).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().alphanum().min(2).required(),
  });
  return schemaAddContact.validate(body);
};

const validationSchemaUpdateContact = (body) => {
  const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(2),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().alphanum().min(2),
  }).min(1);

  return schemaUpdateContact.validate(body);
};
const validationReplaceUpdateContact = (body) => {
  const schemaReplaceContact = Joi.object({
    name: Joi.string().alphanum().min(2).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    phone: Joi.string().alphanum().min(2).optional(),
  }).min(1);

  return schemaReplaceContact.validate(body);
};

module.exports = {
  validationSchemaAddContact,
  validationSchemaUpdateContact,
  validationReplaceUpdateContact,
};
