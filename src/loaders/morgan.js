const morgan = require("morgan");

module.exports = () => {
    morgan.token('request-header', req => JSON.stringify(req.headers));
    morgan.token('request-body', req => JSON.stringify(req.body));
    morgan.token('response-header', (req, res) => JSON.stringify(res.getHeaders()));
    morgan.token('uuid', req => req.id);
}