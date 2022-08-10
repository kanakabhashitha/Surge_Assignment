import CustomAPIError from "./custom-api.js";

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statuseCode = 401;
  }
}

export default UnAuthenticatedError;
