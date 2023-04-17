const express = require('express');
const mdAuth = require('../middleware/auth');

const NewsletterController = require('../controllers/newsletter');

const app = express.Router();

app.post('/newsletter', NewsletterController.susCribeNewsletter);
app.get('/newsletters', mdAuth.userAuthenticated, NewsletterController.getNewsletter);
app.delete('/newsletters/:id', mdAuth.userAuthenticated, NewsletterController.deleteNewsletter);

module.exports = app;