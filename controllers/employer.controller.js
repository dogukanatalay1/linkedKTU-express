const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');
const {
  getOneByQuery, updateByQuery, getAll, getOneById, getAllByQuery, create,
} = require('../services/base-service');
const Employer = require('../models/employer.model');
const JobPost = require('../models/job-post.model');

getEmployers = async (req, res, next) => {
  try {
    const employers = await getAll(Employer.name);

    if (employers[0].length === 0) {
      return next(
        new ApiError('There have been an error!', httpStatus.NOT_FOUND),
      );
    }
    ApiDataSuccess.send('Employers fetched succesfully!', httpStatus.OK, res, employers[0]);
  } catch (error) {
    return next(
      new ApiError(error.message, httpStatus.NOT_FOUND),
    );
  }
};

getEmployerById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employer = await getOneById(Employer.name, id);

    if (employer[0].length === 0) {
      return next(
        new ApiError(`There is no employer with id of ${id}`, httpStatus.BAD_REQUEST),
      );
    }

    ApiDataSuccess.send(`Employer with id of ${id} fetched!`, httpStatus.OK, res, employer[0]);
  } catch (error) {
    return next(
      new ApiError(error.message, httpStatus.NOT_FOUND),
    );
  }
};

module.exports = { getEmployers, getEmployerById };
