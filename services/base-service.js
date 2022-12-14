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

getAll = async (model) => await sequelize.query(`SELECT * FROM "${model}";`);

getAllByQuery = async (model, query) => await sequelize.query('');

getOneById = async (model, id, next) => await sequelize.query(`SELECT * FROM "${model}" WHERE "ID"=${id};`);

getOneByQuery = async (model, key, query) => await sequelize.query(`SELECT * FROM "${model}" WHERE "${key}"='${query}' LIMIT 1`);

getByQuery = async (model, query) => '';

// TODO
create = async (model, data) => '';

updateById = async (model, id, data) => '';

updateByQuery = async (model, query, data) => '';

deleteById = async (model, id) => '';

deleteByQuery = async (model, query) => '';

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
  getAllByQuery,
};
