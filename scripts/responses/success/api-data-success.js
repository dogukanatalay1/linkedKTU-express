class ApiDataSuccess {
  constructor(message, statusCode, res, data) {
    this.message = message;
    this.statusCode = statusCode;
    this.res = res;
    this.data = data;

    ApiDataSuccess.send(message, statusCode, res, data);
  }

  static send(message, statusCode, res, data) {
    res.status(statusCode).json({
      data,
      message,
      success: true,
    });
  }
}

module.exports = ApiDataSuccess;
