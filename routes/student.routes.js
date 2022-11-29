const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

const bodyValidator = require('../middlewares/body-validator.middleware');
const { loginValidation } = require('../validations/student.validation');

router
  .route('/login')
  .post(studentController.login);

module.exports = router;
