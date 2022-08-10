class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    // this.statuseCode = 400;
  }
}

export default CustomAPIError;
