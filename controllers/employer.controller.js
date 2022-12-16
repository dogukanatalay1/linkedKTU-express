const httpStatus = require('http-status');
// const bcrypt = require('bcryptjs');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');
const { getAll, getOneById, create } = require('../services/base-service');
const Employer = require('../models/employer.model');
// const JobPost = require('../models/job-post.model');
const { v4: uuidv4 } = require('uuid');
const eventEmitter = require('../events/event-emitter.event');

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
                    `There is no employer with id of ${id}`,
                    httpStatus.BAD_REQUEST
                )
            );
        }

        ApiDataSuccess.send(
            `Employer with id of ${id} fetched!`,
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

module.exports = { getEmployers, getEmployerById, createEmployer };
