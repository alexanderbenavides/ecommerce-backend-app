const jwt = require('../utils/jwt');

function userAuthenticated(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(500).send({message: 'El token es requerido en la cabecera de la petición'});

    const token = authorization.replace('Bearer ', '');

    try {
        const payload = jwt.decode(token);
        const { exp } = payload;
        const currentTime = new Date().getTime();
        if (exp < currentTime) return res.status(400).send({message: 'El token ha expirado'});
        req.user = payload;
        return next();

    } catch {
        return res.status(400).send({message: 'El token es inválido'});
    }
}

module.exports = {
    userAuthenticated
}