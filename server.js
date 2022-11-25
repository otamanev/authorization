const express = require('express')
const { Client } = require('pg')

const databaseClient = new Client({
    user: "postgres",
    database: "study",
    password: "postgres",
    port: 5432,
    host: "127.0.0.1"

})

databaseClient.connect();

const app = express();

app.post('/', (req, res) => res.status(500).send('егор еще не сделал'));

app.get('/', handleUserRequest);

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`);
});

async function handleUserRequest(req, res) {
    console.log(req.query.login, req.query.pass);
    /** проверяем что пользователь передал нам свой логин */
    if (!('login' in req.query)) {
        res.status(424).send('login missiong');

        return;
    }

    /** проверяем что пользователь передал нам свой пароль */
    if (!('pass' in req.query)) {
        res.status(424).send('user password missing');

        return;
    }

    /** сперва проверим что у нас вообще есть такой пользователь, это просто доп проверка, можно без нее */
    const isUserExists = await databaseClient.query('SELECT COUNT(login) FROM users WHERE login = $1 LIMIT 1', [req.query.login]);
    if (isUserExists.rows[0].count === '0') {
        res.status(404).send('user not found');

        return;
    }

    /** вытягиваем из бд пользователя у которого логин = req.query.login */
    const rawUser = await databaseClient.query('SELECT * FROM users WHERE login = $1', [req.query.login]);
    /** через дополнительную переменную получаем более удобный доступ к пользователю которого вытянули из бд */
    const user = rawUser.rows[0];

    /** проверяем что пароль в бд не отличается от пароля который передал пользователь, если отличается то возвращаем ошибку */
    if (user.password !== req.query.pass) {
        res.status(401).send('bad password');

        return;
    }

    res.send(user);
}



