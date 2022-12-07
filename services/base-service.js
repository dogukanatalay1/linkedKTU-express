const sequelize = require('../scripts/helpers/sequelize.helper');

getAll = async (model) => {
  const dbQueryResult = await sequelize.query(`SELECT * FROM ${model.name}`);

  return dbQueryResult;
};

getOneById = async (model, id) => {
  const dbQueryResult = '';

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
};
