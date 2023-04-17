const express = require('express');
const multiparty = require('connect-multiparty');

const UserController = require('../controllers/user');
const mdAuth = require('../middleware/auth');

const mdAvatar = multiparty({uploadDir: 'src/uploads/users'});

const app = express.Router();

app.get('/user', [mdAuth.userAuthenticated], UserController.getUserById);
app.get('/users', [mdAuth.userAuthenticated], UserController.getUsers);
app.post('/user', [mdAuth.userAuthenticated, mdAvatar], UserController.createUser);
app.patch('/users/:id', [mdAuth.userAuthenticated, mdAvatar], UserController.updateUser);
app.delete('/users/:id', [mdAuth.userAuthenticated], UserController.deleteUser);

module.exports = app;