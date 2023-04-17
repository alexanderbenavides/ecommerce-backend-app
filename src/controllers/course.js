const Course = require('../models/course');
const { saveData, updateData, findDataById, deleteData, getDataListPaginated } = require('../config/endpoint');
const { getFilePath, unlinkFile } = require('../utils/file');

async function getCourses(req, res) {
    // return res.status(500).send({message: 'Ha ocurrido'})
    const { page = 1, size = 10} = req.query;    
    getDataListPaginated(res, Course, page, size);
}

function getPopularCourses(req, res) {
    Course.find().limit(5).sort({rating: -1})
    .then(response => {
        res.status(200).send({response});
    })
    .catch(error => {
        res.status(500).send({message: error})
    });
}

async function getCourseById(req, res) {
    const { id } = req.params;
    findDataById(res, Course, id);

}
async function createCourse(req, res) {
    const course = new Course(req.body);
    if (req.files.img) {
        course.img = getFilePath(req.files.img);
    }
    saveData(res, course);
    
}

async function updateCourse(req, res) {
    const { id } = req.params;
    const courseData = req.body;
    if (req.files.img) {
        const result = await Course.findById(id).exec();
        unlinkFile(result.img);
        courseData.img = getFilePath(req.files.img);
    }
    updateData(res, Course, id, courseData);

}

async function deleteCourse(req, res) {
    const { id } = req.params;
    deleteData(res, Course, id);
}

module.exports = {
    createCourse,
    updateCourse,
    getCourses,
    getCourseById,
    deleteCourse,
    getPopularCourses
};