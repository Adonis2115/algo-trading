const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: '0215',
    database: 'stock_data',
    host: 'localhost',
    port: 5432
})

module.exports = pool