import CustomAPIError from "./custom-api.js";

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statuseCode = 404;
  }
}

export default NotFoundError;
