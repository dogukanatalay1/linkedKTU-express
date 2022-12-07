class ApiError extends Error {
  constructor(message, statusCode, res) {
    super(message);
    this.statusCode = statusCode;

    ApiError.toJson(message, statusCode, res);
  }

  static toJson(message, statusCode, res) {
    res.status(statusCode).json({
      message: message || 'Something went wrong',
      success: false,
      statusCode,
    });
  }
}

module.exports = ApiError;
