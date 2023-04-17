const Post = require('../models/post');
const { saveData, updateData, findDataById, deleteData, getDataListPaginated } = require('../config/endpoint');
const { getFilePath, unlinkFile } = require('../utils/file');

async function getPosts(req, res) {
    const { page = 1, size = 10} = req.query;
    getDataListPaginated(res, Post, page, size);
}

async function getPost(req, res) {
    const { id } = req.params;
    findDataById(res, Post, id);
}

async function createPost(req, res) {
    const post = new Post(req.body);
    post.createdAt = new  Date();
    if (req.files.img) {
        post.img = getFilePath(req.files.img);
    }
    saveData(res, post);
}

async function updatePost(req, res) {
    const { id } = req.params;
    const postData = req.body;
    if (req.files.img) {
        const result = await Post.findById(id).exec();
        unlinkFile(result.img);
        postData.img = getFilePath(req.files.img);
    }
    updateData(res, Post, id, postData);

}

async function deletePost(req, res) {
    const { id } = req.query;
    deleteData(res, Post, id);
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};