const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

const bodyValidator = require('../middlewares/body-validator.middleware');
const schema = require('../validations/student.validation');

router
  .route('/login')
  .post(studentController.login);
  // .post(bodyValidator(schema.loginValidation), studentController.login);

router
   .route('/')
   .get(studentController.getAllStudents)

router
  .route('/:id')
  .get(studentController.getStudent)

module.exports = router;
