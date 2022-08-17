const db = require('./dbConfig');
const fs = require('fs');

function seed(){
    const seeds = fs.readFileSync(__dirname + '/1_setup.sql').toString();
    console.log(seeds)
    db.query(seeds, async () => console.log('Dev database seeded'));
}

module.exports = seed
