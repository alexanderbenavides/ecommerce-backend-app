const express = require('express');
const multiparty = require('connect-multiparty');

const PostController = require('../controllers/post');
const mdAuth = require('../middleware/auth');
const mdPost = multiparty({uploadDir: 'src/uploads/posts'});

const app = express.Router();

app.get('/posts', PostController.getPosts);
app.get('/posts/:id', PostController.getPost);
app.post('/post', [mdAuth.userAuthenticated, mdPost], PostController.createPost);
app.patch('/posts/:id', [mdAuth.userAuthenticated, mdPost], PostController.updatePost);
app.delete('/posts/:id', mdAuth.userAuthenticated, PostController.deletePost);

module.exports = app;