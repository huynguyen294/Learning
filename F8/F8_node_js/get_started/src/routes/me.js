const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

router.get('/stored/courses', meController.storeCourse)
router.get('/trash/courses', meController.trashCourse)
router.get('/', meController.profile)

module.exports = router
