const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/config');

function createAccessToken(user) {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 5);
    return jwt.sign(getRefreshPayload(user, expiration), JWT_SECRET_KEY);
}


function createRefreshToken(user) {
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);
    return jwt.sign(getRefreshPayload(user, expiration, 'refresh'), JWT_SECRET_KEY);
}

function decode(token, JWT_SECRET_KEY) {
    return jwt.decode(token, JWT_SECRET_KEY, true);
}

function getRefreshPayload(user, expiration, tokenType = 'token') {
    return {
        tokenType,
        userId: user._id,
        role: user.role,
        iat: Date.now(),
        exp: expiration.getTime()
    }
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decode
}