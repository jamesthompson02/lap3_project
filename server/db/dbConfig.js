const { Pool } = require("pg");

const pool = new Pool(); // not using docker so need to add db configuration in the Pool()

module.exports = pool;
