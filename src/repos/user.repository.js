const { Client } = require('pg')

const databaseClient = new Client({
    user: "postgres",
    database: "study",
    password: "postgres",
    port: 5432,
    host: "127.0.0.1"
});

databaseClient.connect();

async function findOne(login) {
    const res = await databaseClient.query('SELECT * FROM users WHERE login = $1', [login]);

    return res.rows[0];
}

async function isUserExists(login) {
    const res = await databaseClient.query('SELECT COUNT(login) AS count FROM users WHERE login = $1 LIMIT 1', [login]);

    return res.rows[0].count !== '0';
}

module.exports = {
    findOne,
    isUserExists,
};
