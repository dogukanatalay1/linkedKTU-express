const sequelize = require('../scripts/helpers/sequelize.helper');

// const AccountType = {
//   lecturer: 'Lecturer',
//   student: 'Student',
//   employer: 'Employer',
// };

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


const create = async (model, data) =>
    await sequelize.query(`INSERT INTO public."${model}"(
        "ID",
        "Email",
        "Password",
        "Fullname",
        "Description",
        "Image",
        "Phone",
        "Address",
        "IsInternshipRemote",
        "IsWorkRemote",
        "City"
        ) VALUES(
            ${data.ID},
            ${data.Email},
            ${data.Password},
            ${data.Fullname},
            ${data.Description},
            ${data.Image},
            ${data.Phone},
            ${data.Address},
            ${data.IsInternShipRemote},
            ${data.IsWorkRemote},
            ${data.City},
        )`);



// const updateById = async (model, id, data) => '';

// const updateByQuery = async (model, query, data) => '';

// const deleteById = async (model, id) => '';

// const deleteByQuery = async (model, query) => '';

module.exports = {
    getAll,
    getOneById,
    getOneByQuery,
    create,
    // updateById,
    // updateByQuery,
    // deleteById,
    // deleteByQuery,
    getAllByQuery,
};
