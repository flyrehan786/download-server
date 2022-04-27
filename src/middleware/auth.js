const authValidator = require('../validator/authValidator');
module.exports = async function (req, res, next) {
    const headers = req.headers;
    if(Object.keys(headers).filter(x => x === 'auth').length > 0 && +req.query.id !== 95123) {
        const VALIDATED = await authValidator.validate(JSON.parse(req.headers.auth));
        // req.query.id === 95123 : (User can also download file using this query string)
        if (VALIDATED || +req.query.id === 95123) next();
        else res.json({ exit: 1, message: "User Authentication Failed." })
    } else if(req.query.id == 95123) {
        console.log('Downloading via A querystring.');
        next();
    }
    else res.json({ exit: 2, message: "User Authentication Failed." })
};

