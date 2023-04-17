const Newsletter = require('../models/newsletter');
const { saveData, deleteData, getDataListPaginated } = require('../config/endpoint');

function susCribeNewsletter(req, res) {
    const { email, message } = req.body;
    const newsletter = new Newsletter({
        email: email.toLowerCase(),
        message
    });
    saveData(res, newsletter);
}

async function getNewsletter(req, res) {
    const { page = 1, size = 10} = req.query;    
    getDataListPaginated(res, Newsletter, page, size);
}

async function deleteNewsletter(req, res) {
    const { id } = req.params;
    deleteData(res, Newsletter, id);
}

module.exports = {
    susCribeNewsletter,
    getNewsletter,
    deleteNewsletter
};