const Menu = require('../models/menu');
const { saveData, updateData, deleteData, getDataListPaginated } = require('../config/endpoint');
function createMenu(req, res) {
    const menu = new Menu(req.body);
    return saveData(res, menu);
}

async function getMenus(req, res) {
    const { active, page = 1, size = 10 } = req.query;
    if (typeof active !== 'undefined') {
        const response = await Menu.find({active:  active === 'true'}).sort({order: 'asc'}).exec();
        return res.status(200).send({response});
    }
    
    return getDataListPaginated(res, Menu, page, size);
}

async function updateMenu(req, res) {
    const { id } = req.params;
    const menuData = req.body;
    updateData(res, Menu, id, menuData);
}

async function deleteMenu(req, res) {
    const { id } = req.params;
    deleteData(res, Menu, id);
}

module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
};