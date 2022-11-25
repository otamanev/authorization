const { BadPasswordError } = require('../errors/bad-password-error');
const { UserNotFoundError } = require('../errors/user-not-found-error');
const { ValidationError } = require('../errors/validation-error');
const userRepository = require('../repos/user.repository');

async function login(login, password) {
    /** проверяем что пользователь передал нам свой логин */
    if (!login) {
        throw new ValidationError('login missiong');
    }

    /** проверяем что пользователь передал нам свой пароль */
    if (!password) {
        throw new ValidationError('user password missing');
    }

    /** сперва проверим что у нас вообще есть такой пользователь, это просто доп проверка, можно без нее */
    const isUserExists = await userRepository.isUserExists(login);
    if (!isUserExists) {
        throw new UserNotFoundError(login);
    }

    /** вытягиваем из бд пользователя у которого логин = req.query.login */
    const user = await userRepository.findOne(login);

    /** проверяем что пароль в бд не отличается от пароля который передал пользователь, если отличается то возвращаем ошибку */
    if (user.password !== password) {
        throw new BadPasswordError(login);
    }

    return user;
}

module.exports = {
    login,
};
