const express = require('express');
const UserController = require('../controllers/user_controller');
const UserValidator = require('../validators/user_validator');

const router = express.Router();

router.post('/', UserValidator.postUsersValidator, UserController.postUsers);

module.exports = router;