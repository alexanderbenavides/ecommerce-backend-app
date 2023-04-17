const User = require('../models/user');
const { saveData, updateData, deleteData, findDataById, getDataListPaginated } = require('../config/endpoint');
const { hashPassword } = require('../utils/hashPassword');
const { getFilePath, unlinkFile } = require('../utils/file');

async function getUserById(req, res) {
    const { userId } = req.user;
    findDataById(res, User, userId);
}

async function getUsers(req, res) {
    const { active } = req.query;
    if (typeof active !== 'undefined') {
        const response = await User.find({active:  active === 'true'}).exec();
        return  res.status(200).send({response});
    } else {
        const { page = 1, size = 10} = req.query;    
        return getDataListPaginated(res, User, page, size);;
    }
    
}

async function createUser(req, res) {
    const { password } = req.body;
    const user = new User({...req.body, active: false, password: hashPassword(password)});
    if (req.files.img) {
        user.img = getFilePath(req.files.img);
    }
    return saveData(res, user);
}

async function updateUser(req, res) {
    const { id } = req.params;
    const userdata = req.body;
    const { password } = userdata;
    if (password) {
        userdata.password = hashPassword(password);
    }
    if (req.files.img) {
        const result = await User.findById(id).exec();
        unlinkFile(result.img);
        userdata.img = getFilePath(req.files.img);
    }

    updateData(res, User, id, userdata);

}

async function deleteUser(req, res) {
    const { id } = req.params;
    deleteData(res, User, id);
}

module.exports = {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}