const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },

  // user: process.env.USER,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE,
  // host: process.env.HOST,
  // port: process.env.DBPORT,
}); // not using docker so need to add db configuration in the Pool()

module.exports = pool;
