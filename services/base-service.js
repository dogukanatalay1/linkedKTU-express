const httpStatus = require('http-status');
const sequelize = require('../scripts/helpers/sequelize.helper');
const UserModel = require('../models/base-user.model');
const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');

const AccountType = {
  lecturer: 'Lecturer',
  student: 'Student',
  employer: 'Employer',
};

const createUser = async (req, res) => {
  const newUser = {
    email: req.body.email,
  };

  const isAlreadyExist = await this.getOneByQuery();

  if (isAlreadyExist) {
    new ApiError('This email is already in use', httpStatus.BAD_REQUEST, res);
    throw Error();
  }

  const createdUser = await this.create(UserModel, newUser);

  new ApiDataSuccess(
    'User created succesfully',
    httpStatus.OK,
    res,
    createUser,
  );
};

getAll = async (model) => {
  const dbQueryResult = await sequelize.query(`SELECT * FROM "${model}";`);

  return dbQueryResult;
};

getAllByQuery = async (model, query) => {
  const dbQueryResult = await sequelize.query(``)
};

getOneById = async (model, id) => {
  const dbQueryResult = await sequelize.query(`SELECT * FROM "${model}" WHERE "ID"=${id};`);

  return dbQueryResult;
};

getOneByQuery = async (model, query) => {
  const dbQueryResult = '';

  return dbQueryResult;
};

getByQuery = async (model, query) => {
  const dbQueryResult = '';

  return dbQueryResult;
};

create = async (model, data) => {
  const dbQueryResult = '';

  return dbQueryResult;
};

updateById = async (model, id, data) => {
  const dbQueryResult = '';

  return dbQueryResult;
};

updateByQuery = async (model, query, data) => {
  const dbQueryResult = '';

  return dbQueryResult;
};

deleteById = async (model, id) => {
  const dbQueryResult = '';

  return dbQueryResult;
};

deleteByQuery = async (model, query) => {
  const dbQueryResult = '';

  return dbQueryResult;
};

module.exports = {
  getAll,
  getOneById,
  getOneByQuery,
  getByQuery,
  create,
  updateById,
  updateByQuery,
  deleteById,
  deleteByQuery,
  getAllByQuery
};
