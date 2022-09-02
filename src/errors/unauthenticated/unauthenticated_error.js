const {CommonError} = require("../common_error");

class UnauthenticatedError extends CommonError {
    constructor(message) {
        super(message, 401);
    }
}

module.exports = {
    UnauthenticatedError
}