const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const {
  getOneByQuery, updateByQuery, getAll, getOneById, getAllByQuery, create,
} = require('../services/base-service');
const JobPost = require('../models/job-post.model');

createPost = async (req, res, next) => {
  const {
    title, description, company, role, technologies,
    isRemote, salary, isAccepted, applicants,
  } = req.body;

  try {
    const jobPost = create(JobPost.name);

    if (!jobPost) {
      return next(
        new ApiError('There have been an error!', httpStatus.BAD_REQUEST),
      );
    }

    ApiDataSuccess.send('Job post created succesfully!', httpStatus.OK, res, jobPost);
  } catch (error) {
    return next(
      new ApiError(error.message, httpStatus.NOT_FOUND),
    );
  }
};

module.exports = { createPost };
