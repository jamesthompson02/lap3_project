const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    `postgres://qwwktodwqmjwmg:a1b049f25b709e0bd318a2b4994e5f32851c1bcd3670366593305f27371202c9@ec2-52-30-159-47.eu-west-1.compute.amazonaws.com:5432/d3abnrhaoi6h9d`,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },

  //   user: process.env.USER,
  //   password: process.env.PASSWORD,
  //   database: process.env.DATABASE,
  //   host: process.env.HOST,
  //   port: process.env.DBPORT,
}); // not using docker so need to add db configuration in the Pool()

module.exports = pool;
