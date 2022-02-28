const express = require('express')
const router = express.Router()

const CourseController = require('../app/controllers/CourseController')

router.get('/create', CourseController.Create)
router.post('/store', CourseController.Store)
router.get('/:slug', CourseController.showDetails)

module.exports = router
