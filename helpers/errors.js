const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbbiden",
  404: "Not found",
  409: "Conflilct",
};
const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  NotAuthorizedError,
  RequestError,
  handleSaveErrors,
};
