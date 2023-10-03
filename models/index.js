require('dotenv').config();
const dbConfig = require("../config/db.config.js");


const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("./students.js")(sequelize, Sequelize);

module.exports = db;