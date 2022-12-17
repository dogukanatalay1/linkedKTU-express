const httpStatus = require('http-status');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');
const {
    getAll,
    getOneById,
    create,
    getOneByQuery,
    sendEmail,
} = require('../services/base-service');
const Employer = require('../models/employer.model');
const { v4: uuidv4 } = require('uuid');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');

const login = async (req, res, next) => {
    let employer;

    try {
        employer = await getOneByQuery(Employer.name, 'Email', req.body.email);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (employer[0].length === 0) {
        return next(
            new ApiError(
                'Email or password is incorrect!',
                httpStatus.BAD_REQUEST
            )
        );
    }

    const employerObject = employer[0][0];

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
};

const getEmployers = async (req, res, next) => {
    let employers;

    try {
        employers = await getAll(Employer.name);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

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
};

const getEmployerById = async (req, res, next) => {
    const { id } = req.params;
    let employer;

    try {
        employer = await getOneById(Employer.name, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

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
};

const createEmployer = async (req, res, next) => {
    const employerData = {
        ID: uuidv4(),
        Email: req.body.email,
        Password: req.body.password,
        Fullname: req.body.fullname,
        Description: req.body.description,
        Image: req.body.image,
        Phone: req.body.phone,
        Address: req.body.address,
        IsInternshipRemote: req.body.isInternshipRemote,
        IsWorkRemote: req.body.isWorkRemote,
        City: req.body.city,
    };

    let employer;

    try {
        employer = await create(Employer.name, employerData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    sendEmail(employerData.Email, employerData.Fullname, employerData.Password);

    ApiDataSuccess.send(
        'Employer created succesfully!',
        httpStatus.OK,
        res,
        employer[0]
    );
};

module.exports = { getEmployers, getEmployerById, createEmployer, login };
