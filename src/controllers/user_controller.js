const UserService = require('../services/user_service');

module.exports = {
    postUsers (req, res, next) {
        try {
            UserService.create({
                name: req.body.name
            });

            res.status(200).send('ok');
        } catch(err) {
            next(err);
        }
    }
}
