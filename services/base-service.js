const sequelize = require('../scripts/helpers/sequelize.helper');

const getAll = async (model) =>
    await sequelize.query(`SELECT * FROM "${model}";`);

const getAllByQuery = async (model,key, query) =>
    await sequelize.query(`SELECT "s".*
    FROM "${model}_${key}" as "st"
    INNER JOIN "${model}" as "s"
    ON "st"."${model}_ID" = "s"."ID"
    INNER JOIN "${key}" as "t"
    ON "st"."${key}_ID" = "t"."ID"
    WHERE LOWER("t"."TechName") LIKE LOWER('%${query}%');`);

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
    getAllByQuery,
};
