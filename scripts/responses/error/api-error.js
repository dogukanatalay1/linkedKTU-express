class ApiError extends Error {
  constructor(message, statusCode, res) {
    super(message);
    this.statusCode = statusCode;

    ApiError.toJson(res, statusCode, message)
  }

  static toJson(res, statusCode, message) {
      res.status(statusCode).json({
      message: message || 'Something went wrong',
      success: false,
      statusCode: statusCode
    })
  }
}

module.exports = ApiError;
