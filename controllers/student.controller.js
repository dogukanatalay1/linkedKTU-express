const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const { getOneByQuery, updateByQuery, getAll, getOneById, getAllByQuery} = require('../services/base-service');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');
const Student = require('../models/student.model');

const login = async (req, res) => {
  const student = await getOneByQuery(Student.name, {
    email: req.body.email,
  });

  if (student <= 0) {
    const error = new ApiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
    throw Error(error);
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    student.password,
  );

  if (!validPassword) {
    const error = new ApiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
    throw Error(error);
  }

  const access_token = createLoginToken(student, res);

  new ApiDataSuccess('Login succesfull', httpStatus.OK, res, access_token);
};

getStudents = async (req, res) => {
 
  let result = await getAll(Student.name)

  if(!result) {
    new ApiError('There have been an error', httpStatus.BAD_REQUEST, res)
  }

  new ApiDataSuccess('Students fetched succesfully', httpStatus.OK, res, result[0]);
};

getStudent = async (req, res) => {
  const { id } = req.params;

  const student = await getOneById(Student.name, id)

  if (!student) {
    const error = new ApiError(`There is no student with this id: ${id}`, httpStatus.BAD_REQUEST, res);
    throw Error(error);
  }

  new ApiDataSuccess('Student with given id found', httpStatus.OK, res, student[0]);
};

getStudentsByTechnology = async (req, res) => {
  const { tech } = req.params;

  const studentsWithGivenTech = await getAllByQuery(Student.name, tech)

  if (!studentsWithGivenTech.length) {
    const error = new ApiError(`There is no student with given skill ${skill}`, httpStatus.BAD_REQUEST, res);
    throw Error(error);
  }

  new ApiDataSuccess('Students with given skill found', httpStatus.OK, res, studentsWithGivenTech);
};

module.exports = {
  login, getStudents, getStudent, getStudentsByTechnology, 
};
