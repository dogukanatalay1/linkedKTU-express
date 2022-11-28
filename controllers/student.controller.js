const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../scripts/responses/error/api-error');
const ApiSuccess = require('../scripts/responses/success/api-success');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const { getOneByQuery, updateByQuery } = require('../services/base-service');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');
const StudentModel = require('../models/student.model')

const login = async (req, res) => {
  console.log(req.body);

  const student = await getOneByQuery(StudentModel, {
      email: req.body.email,
  });

  if (student <= 0) {
      ApiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
      throw Error();
  }

  const validPassword = await bcrypt.compare(
      req.body.password,
      student.dataValues.password
  );

  if (!validPassword) {
      ApiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
      throw Error();
  }

  // ? Create And Assign A Token
  const token = createLoginToken(student, res);
  // await ???

  ApiDataSuccess(
      'Login Success',
      { access_token: token },
      true,
      httpStatus.OK,
      res
  );

 
};

module.exports = { login }
