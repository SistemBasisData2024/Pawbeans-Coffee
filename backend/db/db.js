const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pawbeans_database',
    password: '',
    port: 5432,
});

module.exports = pool;
