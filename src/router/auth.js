const express = require('express');
const AuthController = require('../controllers/auth');

const app = express.Router();

app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);
app.post('/auth/refresh', AuthController.refreshAccessToken);

module.exports = app;