class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
module.exports = {
  NotAuthorizedError,
  ValidationError,
};
