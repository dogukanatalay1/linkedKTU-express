const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const {
  getOneByQuery, updateByQuery, getAll, getOneById, getAllByQuery, create,
} = require('../services/base-service');
const JobPost = require('../models/job-post.model');
const httpStatus = require('http-status');

getJobPosts = async (req, res, next) => {
  try {
    const jobPosts = await getAll(JobPost.name)

    if (jobPosts[0].length === 0) {
      return next(
        new ApiError('There are no job posts found!', httpStatus.NOT_FOUND)
      )
    }

    ApiDataSuccess.send('Job posts fetched succesfully!', httpStatus.OK, res, jobPosts)
  } catch (error) {
    return next(
      new ApiError(error.message, httpStatus.NOT_FOUND)
    )
  }
};

getJobPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const jobPost = await getOneById(JobPost.name, id);

    // CHECK HERE!
    if (jobPost[0].length === 0) {
      return next(
        new ApiError(`There are no job post with id of ${id}`, httpStatus.BAD_REQUEST)
      )
    }

    ApiDataSuccess.send(`Jobpost with id of ${id} fetched!`, httpStatus.OK, res, jobPost);
  } catch (error) {
    return next(
      new ApiError(error.message, httpStatus.NOT_FOUND)
    )
  }
};

createJobPost = async (req, res, next) => {
  const {
    title, description, company, role, technologies,
    isRemote, salary, isAccepted, applicants,
  } = req.body;

  try {

    const jobPostData = {
      Title: title,
      Description: description,
      Company: company,
      Role: role,
      Technologies: technologies,
      IsRemote: isRemote,
      Salary: salary,
      isAccepted: isAccepted,
      Applicants: applicants
    }

    const jobPost = await create(JobPost.name, jobPostData);

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

deleteJobPost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedJobPost = await deleteById(JobPost.name, id)

    // CHECK HERE!
    if (!deletedJobPost) {
      return next(
        new ApiError(`Couldn't delete post ${id}`, httpStatus.BAD_REQUEST)
      )
    }

    ApiDataSuccess.send(`Job post id: ${id} deleted!`, httpStatus.OK, res, deletedJobPost);
  } catch (error) {
    return next(
      new ApiError(error.message, httpStatus.NOT_FOUND)
    )
  }
};

module.exports = { getJobPosts, getJobPostById, createJobPost, deleteJobPost };
