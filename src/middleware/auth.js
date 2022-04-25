const authValidator = require('../validator/authValidator');
module.exports = function (req, res, next) {
    const AUTH = req.headers.auth;
    const VALIDATED = await authValidator.validate(JSON.parse(AUTH));
    // req.query.id === 95123 : (User can also download file using this query string)
    if (VALIDATED || +req.query.id === 95123) next();
    else res.json({ exit: 1, message: "User Authentication Failed." })
};