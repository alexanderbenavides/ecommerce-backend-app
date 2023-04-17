const express = require('express');
const MenuController = require('../controllers/menu');
const mdAuth = require('../middleware/auth');

const app = express.Router();

app.post('/menu', mdAuth.userAuthenticated, MenuController.createMenu);
app.get('/menus', MenuController.getMenus);
app.patch('/menus/:id', mdAuth.userAuthenticated, MenuController.updateMenu);
app.delete('/menus/:id', mdAuth.userAuthenticated, MenuController.deleteMenu);

module.exports = app;