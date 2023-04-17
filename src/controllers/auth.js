const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { saveData } = require('../config/endpoint');
const { hashPassword } = require('../utils/hashPassword');
const jwt = require('../utils/jwt');

function register(req, res) {
    const { firstName, lastName, email, password, role } = req.body;
    const user = new User(
        {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashPassword(password),
            active: false
        }
    );

    if (role) user.role = role;
    return saveData(res, user);

}

function login(req, res) {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();
    User.findOne({email: emailLowerCase})
    .then( (userStorage) => {
        bcrypt.compare(password, userStorage.password, (error, check) => {
            if (error) return res.status(500).send({message: 'Error del servidor'});
            if (!check) return res.status(400).send({message: 'Datos incorrectos'});
            if (!userStorage.active) return res.status(401).send({message: 'Usuario no activo'});
            return res.status(200).send({
                response: {
                token: jwt.createAccessToken(userStorage),
                refresh: jwt.createRefreshToken(userStorage)
            
                }
            });
        })
    }).catch( () => {
        return res.status(500).send({message: 'Error al obtener usuario'});
    });

}

function refreshAccessToken(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).send({message: 'Token requerido'});

    const { userId } = jwt.decode(token);

    User.findOne({_id: userId})
    .then( (userStorage) => {
        res.status(200).send({
            response: {
                token: jwt.createAccessToken(userStorage)
            }
        });
    }).catch( () => {
        res.status(500).send({message: 'Error del servidor'});
    });

}

module.exports = { 
    register,
    login,
    refreshAccessToken 
};