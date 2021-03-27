//app/middleware/verifyAuth.js
require('dotenv').config()
let secret = process.env.SECRET;
var jwt = require('jsonwebtoken');





/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */

function verifyToken(req, res, next) {
    let errorMessage
    if(!req.headers.authorization){
        errorMessage = "Unauthorized reuqest"
        return res.status(401).send(errorMessage);
    }
    let token  = req.query.token;
    if (!token) {
        errorMessage = 'Token not provided';
        return res.status(400).send(errorMessage);
    }
    try {
        const decoded =  jwt.verify(token, secret);
        req.user = {
            email: decoded.email,
            username: decoded.username,
            is_admin: decoded.is_admin,
        };
        next();
    } catch (error) {
        errorMessage = 'Authentication Failed';
        return res.status(401).send(errorMessage);
    }
};

module.exports =  {verifyToken};
