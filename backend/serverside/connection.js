const { Pool } = require('pg');

const pool = new Pool ({
    user: "postgres",
    host: "localhost" ,
    port: 5432,
    database:"next_auth",
    password:"1234",
})

module.exports = pool