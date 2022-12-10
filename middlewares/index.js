const validateBody = require("./validationBody");
const authMiddleware = require("./validationToken");
const isValidId = require("./isValidId");
const avatarMiddleware = require("./uploadMiddleware");
module.exports = {
  validateBody,
  authMiddleware,
  isValidId,
  avatarMiddleware,
};
