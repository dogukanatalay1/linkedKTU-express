const sequelize = require('../scripts/helpers/sequelize.helper');

// const AccountType = {
//   lecturer: 'Lecturer',
//   student: 'Student',
//   employer: 'Employer',
// };

const getAll = async (model) =>
    await sequelize.query(`SELECT * FROM "${model}";`);

// const getAllByQuery = async (model, query) => await sequelize.query('');

const getOneById = async (model, id) =>
    await sequelize.query(`SELECT * FROM "${model}" WHERE "ID"=${id};`);

const getOneByQuery = async (model, key, query) =>
    await sequelize.query(
        `SELECT * FROM "${model}" WHERE "${key}"='${query}' LIMIT 1`
    );

// const create = async (model, data) => '';

// const updateById = async (model, id, data) => '';

// const updateByQuery = async (model, query, data) => '';

// const deleteById = async (model, id) => '';

// const deleteByQuery = async (model, query) => '';

module.exports = {
    getAll,
    getOneById,
    getOneByQuery,
    // create,
    // updateById,
    // updateByQuery,
    // deleteById,
    // deleteByQuery,
    // getAllByQuery,
};
