const express = require('express');
const multiparty = require('connect-multiparty');

const CourseController = require('../controllers/course');
const mdAuth = require('../middleware/auth');

const mdCourse = multiparty({uploadDir: 'src/uploads/courses'});

const app = express.Router();

app.post('/products', [mdAuth.userAuthenticated, mdCourse], CourseController.createCourse);
app.patch('/products/:id', mdCourse, CourseController.updateCourse);
app.get('/products/:id', mdCourse, CourseController.getCourseById);
app.delete('/products/:id', mdCourse, CourseController.deleteCourse);
app.get('/products', CourseController.getCourses);
app.get('/products-popular', CourseController.getPopularCourses);

module.exports = app;