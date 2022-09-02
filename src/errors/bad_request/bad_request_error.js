const {CommonError} = require("../common_error");

class BadRequestError extends CommonError {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = {
    BadRequestError
};