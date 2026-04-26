const { generateCsrfToken } = require('../middlewares/csrf.middleware');

exports.getCsrfToken = (req, res) => {
    const token = generateCsrfToken(req, res);

    res.json({
        csrfToken: token
    });
};