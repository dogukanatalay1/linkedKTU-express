const sequelize = require('../scripts/helpers/sequelize.helper')

getAll = async (model) => {
  const dbQueryResult = await sequelize.query('SELECT * FROM users')

  return dbQueryResult;
};

getOneById = async (model, id) => {
  const dbQuery = ''

  return dbQuery;
};

getOneByQuery = async (model, query) => {
  const dbQuery = ''

  return dbQuery;
};

getByQuery = async (model, query) => {
  const dbQuery = ''

  return dbQuery;
};

create = async (model, data) => {
  const dbQuery = ''

  return dbQuery;
};

updateById = async (model, id, data) => {
  const dbQuery = ''

  return dbQuery;
};

updateByQuery = async (model, query, data) => {
  const dbQuery = ''

  return dbQuery;
};

deleteById = async (model, id) => {
  const dbQuery = ''

  return dbQuery;
};

deleteByQuery = async (model, query) => {
  const dbQuery = ''

  return dbQuery;
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
