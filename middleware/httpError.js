class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
    this.status = errorCode;
  }
}

export default HttpError;
