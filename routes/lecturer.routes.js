const express = require('express');

const router = express.Router();
const httpStatus = require('http-status');
const lecturerControllers = require('../controllers/lecturer.controller');
const ApiError = require('../scripts/responses/error/api-error');
const ApiSuccess = require('../scripts/responses/success/api-success');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');

router.get('/', (req, res) => {
  res.status(200).json(
    {
      lecturerName: 'Mustafa Ulutaş',
    },
  );
});

module.exports = router;
