const express = require('express');
const userService = require('./services/user.service');
const { BadPasswordError } = require('./errors/bad-password-error');
const { UserNotFoundError } = require('./errors/user-not-found-error');
const { ValidationError } = require('./errors/validation-error');


const router = express.Router();

router.get('/', async function (req, res) {
    let user;
    try {
        user = await userService.login(req.query.login, req.query.password);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(424).send(error.message);
        } else if (error instanceof UserNotFoundError) {
            res.status(404).send(error.message);
        } else if (error instanceof BadPasswordError) {
            res.status(401).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
        
        return;
    }

    res.send(user);
});

module.exports = router;