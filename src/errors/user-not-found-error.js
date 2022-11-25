class UserNotFoundError extends Error {
    constructor(login) {
        super(`user with login: ${login} not found`);
    }
}

module.exports = {
    UserNotFoundError,
};
