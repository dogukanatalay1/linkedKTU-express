const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const {
    getOneByQuery,
    getAll,
    getOneById,
    getAllByQuery,
    create,
} = require('../services/base-service');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');
const Student = require('../models/student.model');
const passwordHelper = require('../scripts/helpers/password.helper');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../scripts/helpers/send-email.helper');

const login = async (req, res, next) => {
    const student = await getOneByQuery(Student.name, {
        email: req.body.email,
    });

    if (student <= 0) {
        return next(
            new ApiError(
                'Email or password is incorrect',
                httpStatus.BAD_REQUEST
            )
        );
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        student.password
    );

    if (!validPassword) {
        return next(
            new ApiError(
                'Email or password is incorrect',
                httpStatus.BAD_REQUEST
            )
        );
    }

    const access_token = createLoginToken(student, res);

    ApiDataSuccess.send('Login succesfull', httpStatus.OK, res, access_token);
};

const createStudent = async (req, res, next) => {
    let student;

    try {
        student = await getOneByQuery(Student.name, 'Email', req.body.email);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!student[0].length === 0) {
        return next(
            new ApiError('This email already in use!', httpStatus.BAD_REQUEST)
        );
    }

    const studentPassword = await passwordHelper.passwordToHash(
        req.body.password
    );

    const studentData = {
        ID: uuidv4(),
        Email: req.body.email,
        Password: studentPassword.hashedPassword,
        Fullname: req.body.fullname,
        Description: req.body.description,
        Image: req.body.image,
        Phone: req.body.phone,
        Address: req.body.address,
        School: req.body.school,
        City: req.body.city,
        ContactMail: req.body.contactmail,
    };

    sendEmail(studentData.Email, studentData.Fullname, studentData.Password);

    const createdStudent = await create(Student.name, studentData);

    ApiDataSuccess.send(
        'Student created succesfully!',
        httpStatus.OK,
        res,
        createdStudent
    );
};

const getStudents = async (req, res, next) => {
    let result;

    try {
        result = await getAll(Student.name);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!result[0].length === 0) {
        return next(
            new ApiError('There have been an error', httpStatus.BAD_REQUEST)
        );
    }

    ApiDataSuccess.send(
        'Students fetched succesfully',
        httpStatus.OK,
        res,
        result[0]
    );
};

const getStudentById = async (req, res, next) => {
    const { id } = req.params;
    let student;

    try {
        student = await getOneById(Student.name, id, next);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (student[0].length === 0) {
        return next(
            new ApiError('There have been an error!', httpStatus.NOT_FOUND)
        );
    }

    ApiDataSuccess.send(
        'Student with given id found',
        httpStatus.OK,
        res,
        student[0]
    );
};

const getStudentsByTechnology = async (req, res, next) => {
    const { technology } = req.params;
    let studentsWithGivenTech;

    try {
        studentsWithGivenTech = await getAllByQuery(
            Student.name,
            'Technologies',
            technology
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (studentsWithGivenTech[0].length === 0) {
        return next(
            new ApiError(
                `There is no student with given tech ${technology}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        'Students with given skill found',
        httpStatus.OK,
        res,
        studentsWithGivenTech[0]
    );
};

module.exports = {
    login,
    getStudents,
    getStudentById,
    getStudentsByTechnology,
    createStudent,
};
