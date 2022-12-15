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
const eventEmitter = require('../events/event-emitter.event');
const { v4: uuidv4 } = require('uuid');

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
    const {
        email,
        password,
        fullname,
        description,
        image,
        phone,
        address,
        school,
        city,
        contactmail,
    } = req.body;

    try {
        const student = await getOneByQuery(Student.name, 'Email', email);

        if (!student[0].length === 0) {
            return next(
                new ApiError(
                    'This email already in use!',
                    httpStatus.BAD_REQUEST
                )
            );
        }
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    const studentPassword = (await passwordHelper.passwordToHash(password))
        .hashedPassword;

    const id = uuidv4();

    eventEmitter.emit('send_email', {
        to: email,
        subject: 'linkedKTU verification',
        template: 'student-password-template',
        context: {
            fullName: fullname,
            password: studentPassword,
        },
    });

    const studentData = {
        ID: id,
        Email: email,
        Password: studentPassword,
        Fullname: fullname,
        Description: description,
        Image: image,
        Phone: phone,
        Address: address,
        School: school,
        City: city,
        ContactMail: contactmail,
    };

    // todo
    const createdStudent = await create(Student.name, studentData);

    ApiDataSuccess.send(
        'Student created succesfully!',
        httpStatus.OK,
        res,
        createdStudent
    );
};

const getStudents = async (req, res, next) => {
    try {
        const result = await getAll(Student.name);

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
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
};

const getStudentById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const student = await getOneById(Student.name, id, next);

        if (student[0].length === 0) {
            return next(
                new ApiError(
                    `There is no student with this id: ${id}`,
                    httpStatus.BAD_REQUEST
                )
            );
        }
        ApiDataSuccess.send(
            'Student with given id found',
            httpStatus.OK,
            res,
            student[0]
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
};

const getStudentsByTechnology = async (req, res, next) => {
    const { tech } = req.params;

    try {
        const studentsWithGivenTech = await getAllByQuery(Student.name, tech);

        if (!studentsWithGivenTech.length) {
            return next(
                new ApiError(
                    `There is no student with given tech ${tech}`,
                    httpStatus.BAD_REQUEST
                )
            );
        }

        ApiDataSuccess.send(
            'Students with given skill found',
            httpStatus.OK,
            res,
            studentsWithGivenTech
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
};

module.exports = {
    login,
    getStudents,
    getStudentById,
    getStudentsByTechnology,
    createStudent,
};
