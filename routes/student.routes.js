const express = require('express')
const router = express.Router()
const studentControllers = require('../controllers/student.controller')
const ApiError = require('../scripts/responses/error/api-error')
const ApiSuccess = require('../scripts/responses/success/api-success')
const ApiDataSuccess = require('../scripts/responses/success/api-data-success')
const httpStatus = require('http-status')

router.get('/', (req, res) => {
  res.send('student given!')
})

module.exports = router
