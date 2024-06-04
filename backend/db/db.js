const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://Database_Hafiz_owner:xS2jr8zECGfU@ep-twilight-sun-a1e30inr.ap-southeast-1.aws.neon.tech/Pawbeans_database?sslmode=require'
});

module.exports = pool;
