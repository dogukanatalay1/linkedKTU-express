const httpStatus = require('http-status');
// const bcrypt = require('bcryptjs');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');
const {
    getAll,
    getOneById,
    create,
    getOneByQuery,
} = require('../services/base-service');
const Employer = require('../models/employer.model');
// const JobPost = require('../models/job-post.model');
const { v4: uuidv4 } = require('uuid');
const eventEmitter = require('../events/event-emitter.event');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');

const login = async (req, res, next) => {
    console.log(req.body);

    try {
        const employer = await getOneByQuery(
            Employer.name,
            'Email',
            req.body.email
        );

        if (employer[0].length === 0) {
            return next(
                new ApiError(
                    'Email or password is incorrect!',
                    httpStatus.BAD_REQUEST
                )
            );
        }

        const employerObject = employer[0][0];

        // const validPassword = await bcrypt.compare(
        //     req.body.password,
        //     employerObject.Password
        // );

        const validPassword = employerObject.Password === req.body.password;

        if (!validPassword) {
            return next(
                new ApiError('Email or passwors is incorrect!'),
                httpStatus.BAD_REQUEST
            );
        }

        const access_token = createLoginToken(employerObject, res);

        ApiDataSuccess.send('Login succesfull!', httpStatus.OK, res, {
            access_token: access_token,
        });
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
};

const getEmployers = async (req, res, next) => {
    try {
        const employers = await getAll(Employer.name);

        if (employers[0].length === 0) {
            return next(
                new ApiError('There have been an error!', httpStatus.NOT_FOUND)
            );
        }
        ApiDataSuccess.send(
            'Employers fetched succesfully!',
            httpStatus.OK,
            res,
            employers[0]
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
};

const getEmployerById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const employer = await getOneById(Employer.name, id);

        if (employer[0].length === 0) {
            return next(
                new ApiError(
                    `There are no employers with this id: ${id}`,
                    httpStatus.BAD_REQUEST
                )
            );
        }

        ApiDataSuccess.send(
            `Employer ${id} fetched!`,
            httpStatus.OK,
            res,
            employer[0]
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
};

const createEmployer = async (req, res, next) => {
    const {
        email,
        password,
        fullname,
        description,
        image,
        phone,
        address,
        isInternshipRemote,
        isWorkRemote,
        city,
    } = req.body;

    const id = uuidv4();
    const employerData = {
        ID: id,
        Email: email,
        Password: password,
        Fullname: fullname,
        Description: description,
        Image: image,
        Phone: phone,
        Address: address,
        IsInternshipRemote: isInternshipRemote,
        IsWorkRemote: isWorkRemote,
        City: city,
    };

    try {
        const employer = await create(Employer.name, employerData);

        // console.log(employer[0]);
        // if (employer[0].length === 0) {
        //     return next(
        //         new ApiError(
        //             'Employer dit not created!',
        //             httpStatus.BAD_REQUEST
        //         )
        //     );
        // }

        eventEmitter.emit('send_email', {
            to: email,
            subject: 'linkedKTU verification',
            template: 'student-password-template',
            context: {
                fullName: fullname,
                password: password,
            },
        });

        ApiDataSuccess.send(
            'Employer created succesfully!',
            httpStatus.OK,
            res,
            employer[0]
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
};

module.exports = { getEmployers, getEmployerById, createEmployer, login };
