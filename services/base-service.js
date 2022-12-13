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

getOneByQuery = async (model, key, query) => {
  const dbQueryResult = await sequelize.query(`SELECT * FROM "${model}" WHERE "${key}"='${query}' LIMIT 1`)

  return dbQueryResult;
};

getByQuery = async (model, query) => {
  const dbQueryResult = '';

  return dbQueryResult;
};

// TODO
create = async (model, data) => {
  const dbQueryResult = ``;

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
