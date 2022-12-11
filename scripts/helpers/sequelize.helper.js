const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    define: { charset: 'utf8', collate: 'utf8_general_ci', timestamps: true, },
  },
);

// const sequelize = new Sequelize(process.env.DATABASE_URL,
//   {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//       ssl: true,
//       native: true
//     }
//   })

module.exports = sequelize;
