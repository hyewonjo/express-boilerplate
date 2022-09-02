const { body, validationResult } = require('express-validator');
const { BadRequestError } = require("../errors/bad_request/bad_request_error");

const handler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return next(new BadRequestError(JSON.stringify({errors: errors.array()})));
    next();
};

exports.postUsersValidator = [
    body('name').trim().not().isEmpty().withMessage('name can not be empty'),
    handler,
];