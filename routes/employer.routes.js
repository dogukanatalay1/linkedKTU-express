const express = require('express');
const employerController = require('../controllers/employer.controller')
const router = express.Router();
const httpStatus = require('http-status');
const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');

router
  .route('/')
  .get(employerController.getEmployers)

router
  .route('/:id')
  .get(employerController.getEmployerById)

module.exports = router;
