// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decryptedToken.userId;
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error.message,
        });
    }
};
